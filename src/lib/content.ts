import "server-only";
import { cacheLife } from "next/cache";
import { createReader } from "@keystatic/core/reader";
import { lang as rootLang } from "next/root-params";
import Markdoc, { type RenderableTreeNode } from "@markdoc/markdoc";
import keystaticConfig from "../../keystatic.config";
import { defaultLocale, hasLocale, type Locale } from "@/content";
import type { CaseVisual, WorkFilter } from "@/content/types";

const reader = createReader(process.cwd(), keystaticConfig);

// En production le contenu ne change qu'au redéploiement. En développement, on
// relit les fichiers chaque seconde pour voir ce que l'admin enregistre, avec
// stale et expire ≥ 5 min pour rester dans l'App Shell (sinon Next lève une erreur).
function contentCache() {
  if (process.env.NODE_ENV === "development") cacheLife({ stale: 300, revalidate: 1, expire: 300 });
  else cacheLife("max");
}

/**
 * Langue lue dans le cache lui-même : un paramètre racine (`next/root-params`)
 * fait partie de la clé du cache sans être traité comme une donnée d'URL,
 * contrairement à une langue passée en argument.
 */
async function cachedLang(): Promise<Locale> {
  const value = await rootLang();
  return value && hasLocale(value) ? value : defaultLocale;
}

const pick = (lang: Locale, fr: string, en?: string | null) =>
  lang === "en" && en?.trim() ? en : fr;

/** « 2026-07 » → « juil. 2026 » / « Jul 2026 » ; « 2026 » reste « 2026 ». */
export function formatMonth(value: string | null | undefined, lang: Locale) {
  if (!value) return "";
  const [y, m] = value.split("-");
  if (!m) return y;
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    month: "short",
    year: "numeric",
  }).format(new Date(Number(y), Number(m) - 1, 1));
}

function formatDay(value: string, lang: Locale) {
  return new Intl.DateTimeFormat(lang === "fr" ? "fr-FR" : "en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(`${value}T00:00:00`));
}

const byDateDesc = (a?: string | null, b?: string | null) => (b ?? "").localeCompare(a ?? "");

// ---------- Certifications ----------

export type Certification = {
  slug: string;
  name: string;
  issuer: string;
  date: string;
  dateLabel: string;
  summary: string;
  pdf: string | null;
  credentialUrl: string | null;
  featured: boolean;
};

export async function getCertifications(): Promise<Certification[]> {
  "use cache";
  contentCache();
  const lang = await cachedLang();
  const entries = await reader.collections.certifications.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      name: entry.name,
      issuer: entry.issuer,
      date: entry.date,
      dateLabel: formatMonth(entry.date, lang),
      summary: pick(lang, entry.summaryFr, entry.summaryEn),
      pdf: entry.pdf,
      credentialUrl: entry.credentialUrl,
      featured: entry.featured,
    }))
    .sort((a, b) => byDateDesc(a.date, b.date) || a.name.localeCompare(b.name));
}

// ---------- Projets ----------

export type Project = {
  slug: string;
  id: string;
  title: string;
  filter: WorkFilter;
  tag: string;
  description: string;
  tools: string[];
  url: string | null;
  image: string | null;
  visual: CaseVisual;
  featured: boolean;
};

const prefixes: Record<WorkFilter, string> = {
  web: "WEB",
  audit: "AUD",
  network: "NET",
  soc: "SOC",
  forensic: "DFIR",
  ctf: "CTF",
};

export async function getProjects(): Promise<Project[]> {
  "use cache";
  contentCache();
  const lang = await cachedLang();
  const entries = await reader.collections.projects.all();
  return entries
    .sort(
      (a, b) =>
        Number(b.entry.featured) - Number(a.entry.featured) ||
        byDateDesc(a.entry.date, b.entry.date) ||
        a.entry.title.localeCompare(b.entry.title),
    )
    .map(({ slug, entry }, i) => ({
      slug,
      id: `${prefixes[entry.category]}-${String(i + 1).padStart(2, "0")}`,
      title: pick(lang, entry.title, entry.titleEn),
      filter: entry.category,
      tag: pick(lang, entry.tagFr, entry.tagEn),
      description: pick(lang, entry.descriptionFr, entry.descriptionEn),
      tools: [...entry.tools],
      url: entry.url,
      image: entry.image,
      visual: entry.visual,
      featured: entry.featured,
    }));
}

// ---------- Blog ----------

export type PostSummary = {
  slug: string;
  title: string;
  date: string;
  dateLabel: string;
  excerpt: string;
  cover: string | null;
  tags: string[];
};

export async function getPosts(): Promise<PostSummary[]> {
  "use cache";
  contentCache();
  const lang = await cachedLang();
  const entries = await reader.collections.posts.all();
  return entries
    .map(({ slug, entry }) => ({
      slug,
      title: pick(lang, entry.title, entry.titleEn),
      date: entry.date,
      dateLabel: formatDay(entry.date, lang),
      excerpt: pick(lang, entry.excerptFr, entry.excerptEn),
      cover: entry.cover,
      tags: [...entry.tags],
    }))
    .sort((a, b) => byDateDesc(a.date, b.date));
}

export async function getPostSlugs() {
  "use cache";
  contentCache();
  return reader.collections.posts.list();
}

export async function getPost(slug: string) {
  "use cache";
  contentCache();
  const lang = await cachedLang();
  const entry = await reader.collections.posts.read(slug);
  if (!entry) return null;

  const fr = await entry.contentFr();
  const en = await entry.contentEn();
  const enHasText = en.node.children.some((c) => c.type !== "paragraph" || c.children.length > 0);
  const node = lang === "en" && enHasText ? en.node : fr.node;

  const errors = Markdoc.validate(node);
  if (errors.length) console.error(`Article ${slug} :`, errors);
  // Copie en objets simples pour pouvoir être mise en cache (le rendu React
  // reconnaît les balises grâce à leur propriété $$mdtype).
  const content = JSON.parse(JSON.stringify(Markdoc.transform(node))) as RenderableTreeNode;

  return {
    slug,
    title: pick(lang, entry.title, entry.titleEn),
    date: entry.date,
    dateLabel: formatDay(entry.date, lang),
    excerpt: pick(lang, entry.excerptFr, entry.excerptEn),
    cover: entry.cover,
    tags: [...entry.tags],
    content,
  };
}

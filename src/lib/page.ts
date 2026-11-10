import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getDictionary, hasLocale } from "@/content";

/** Valide la langue de l'URL et renvoie le dictionnaire correspondant. */
export async function resolvePage(params: Promise<{ lang: string }>) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  return { lang, dict: getDictionary(lang) };
}

export async function subpageMetadata(
  params: Promise<{ lang: string }>,
  path: string,
  pick: (dict: ReturnType<typeof getDictionary>) => { title: string; intro: string },
): Promise<Metadata> {
  const { lang } = await params;
  if (!hasLocale(lang)) return {};
  const { title, intro } = pick(getDictionary(lang));
  return {
    title: `${title} — Malick Assouma`,
    description: intro,
    alternates: {
      canonical: `/${lang}/${path}`,
      languages: { fr: `/fr/${path}`, en: `/en/${path}` },
    },
  };
}

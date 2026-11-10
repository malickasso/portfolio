import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { lang as rootLang } from "next/root-params";
import { getDictionary, hasLocale, type Locale } from "@/content";

/**
 * Langue de la page, lue via `next/root-params` : c'est un paramètre racine
 * partagé par toutes les routes, il peut donc faire partie de l'App Shell
 * (contrairement à `params`, que Next traite comme une donnée d'URL).
 */
export async function currentLang(): Promise<Locale | null> {
  const value = await rootLang();
  return value && hasLocale(value) ? value : null;
}

/** Valide la langue et renvoie le dictionnaire correspondant. */
export async function resolvePage() {
  const lang = await currentLang();
  if (!lang) notFound();
  return { lang, dict: getDictionary(lang) };
}

export async function subpageMetadata(
  path: string,
  pick: (dict: ReturnType<typeof getDictionary>) => { title: string; intro: string },
): Promise<Metadata> {
  const lang = await currentLang();
  if (!lang) return {};
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

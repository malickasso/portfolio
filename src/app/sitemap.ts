import type { MetadataRoute } from "next";
import { locales } from "@/content";
import { site } from "@/content/site";
import { getPostSlugs } from "@/lib/content";

const pages = ["", "/skills", "/work", "/services", "/certifications", "/blog"];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await getPostSlugs();
  const paths = [...pages, ...slugs.map((slug) => `/blog/${slug}`)];

  return locales.flatMap((lang) =>
    paths.map((path) => ({
      url: `${site.url}/${lang}${path}`,
      alternates: {
        languages: Object.fromEntries(locales.map((l) => [l, `${site.url}/${l}${path}`])),
      },
    })),
  );
}

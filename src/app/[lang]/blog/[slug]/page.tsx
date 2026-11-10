import Markdoc from "@markdoc/markdoc";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import React from "react";
import PageShell from "@/components/PageShell";
import { BackLink } from "@/components/ui";
import { getPost, getPostSlugs } from "@/lib/content";
import { currentLang, resolvePage } from "@/lib/page";

// Chaque article dépend de son identifiant dans l'URL (donnée d'URL) : les pages
// sont pré-générées au build, on les sort donc de la validation « instant ».
export const instant = false;

export async function generateStaticParams() {
  const slugs = await getPostSlugs();
  // Next exige au moins un résultat : sans article, ce slug mène à une 404.
  return slugs.length ? slugs.map((slug) => ({ slug })) : [{ slug: "_" }];
}

export async function generateMetadata({ params }: PageProps<"/[lang]/blog/[slug]">): Promise<Metadata> {
  const lang = await currentLang();
  const { slug } = await params;
  if (!lang) return {};
  const post = await getPost(slug);
  if (!post) return {};
  return {
    title: `${post.title} — Malick Assouma`,
    description: post.excerpt,
    alternates: {
      canonical: `/${lang}/blog/${slug}`,
      languages: { fr: `/fr/blog/${slug}`, en: `/en/blog/${slug}` },
    },
    openGraph: { title: post.title, description: post.excerpt, type: "article", images: post.cover ? [post.cover] : [] },
  };
}

export default async function PostPage({ params }: PageProps<"/[lang]/blog/[slug]">) {
  const { lang, dict } = await resolvePage();
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  return (
    <PageShell lang={lang} dict={dict}>
      <article className="mx-auto max-w-3xl px-5 pt-28 pb-20 sm:pt-32 sm:pb-28 sm:px-8">
        <BackLink href={`/${lang}/blog`}>{dict.blog.backToBlog}</BackLink>
        <p className="font-mono text-xs text-muted">{post.dateLabel}</p>
        <h1 className="mt-3 font-display text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
          {post.title}
        </h1>
        <p className="mt-5 text-lg text-muted">{post.excerpt}</p>
        {post.tags.length > 0 && (
          <div className="mt-6 flex flex-wrap gap-2">
            {post.tags.map((t) => (
              <span key={t} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {t}
              </span>
            ))}
          </div>
        )}
        {post.cover && (
          <div className="relative mt-10 aspect-[16/9] overflow-hidden rounded-3xl border border-line">
            <Image src={post.cover} alt="" fill priority sizes="(min-width: 768px) 48rem, 100vw" className="object-cover" />
          </div>
        )}
        <div className="prose-content mt-12">{Markdoc.renderers.react(post.content, React)}</div>
      </article>
    </PageShell>
  );
}

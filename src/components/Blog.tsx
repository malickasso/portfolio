import { ArrowUpRight, Newspaper } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import type { PostSummary } from "@/lib/content";
import { BackLink, Reveal, SectionHeader, ViewAllLink } from "./ui";

type Props = {
  blog: Dictionary["blog"];
  common: Dictionary["common"];
  lang: Locale;
  posts: PostSummary[];
  preview?: boolean;
};

export default function Blog({ blog, common, lang, posts, preview }: Props) {
  if (preview && posts.length === 0) return null;
  const list = preview ? posts.slice(0, 3) : posts;

  return (
    <section
      id="blog"
      className={`relative overflow-hidden ${preview ? "border-t border-line py-20 sm:py-28" : "min-h-[70vh] pt-28 pb-20 sm:pt-32 sm:pb-28"}`}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {!preview && <BackLink href={`/${lang}`}>{common.back}</BackLink>}
        <SectionHeader
          as={preview ? "h2" : "h1"}
          label={blog.label}
          title={blog.title}
          intro={blog.intro}
          aside={preview && <ViewAllLink href={`/${lang}/blog`}>{common.viewAll}</ViewAllLink>}
        />

        {list.length === 0 && (
          <div className="flex items-center gap-4 rounded-3xl border border-dashed border-line p-8 text-muted">
            <Newspaper className="h-6 w-6 text-accent" />
            {blog.empty}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((p, i) => (
            <Reveal key={p.slug} delay={(i % 3) * 0.08} className={preview && i === 2 && list.length === 3 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <Link
                href={`/${lang}/blog/${p.slug}`}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-accent"
              >
                <div className="grid-bg relative h-44 overflow-hidden border-b border-line bg-surface-2">
                  {p.cover ? (
                    <Image
                      src={p.cover}
                      alt=""
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <Newspaper className="h-10 w-10 text-accent/60" strokeWidth={1.3} />
                    </div>
                  )}
                </div>
                <div className="flex flex-1 flex-col p-6">
                  <p className="font-mono text-xs text-muted">{p.dateLabel}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {p.title}
                  </h3>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.excerpt}</p>
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.slice(0, 3).map((t) => (
                        <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    <span className="inline-flex items-center gap-1.5 text-sm font-medium text-accent">
                      {blog.readMore}
                      <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                    </span>
                  </div>
                </div>
              </Link>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

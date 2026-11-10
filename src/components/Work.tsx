"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import type { Locale } from "@/content";
import type { Dictionary, WorkFilter } from "@/content/types";
import type { Project } from "@/lib/content";
import CaseVisual from "./CaseVisual";
import { ArrowButton, BackLink, Reveal, SectionHeader, ViewAllLink } from "./ui";

type Filter = WorkFilter | "all";
type Props = {
  work: Dictionary["work"];
  common: Dictionary["common"];
  lang: Locale;
  projects: Project[];
  preview?: boolean;
};

export default function Work({ work, common, lang, projects, preview }: Props) {
  const [filter, setFilter] = useState<Filter>("all");
  const filters = (Object.keys(work.filters) as Filter[]).filter(
    (f) => f === "all" || projects.some((p) => p.filter === f),
  );

  const featured = projects.filter((p) => p.featured);
  const items = preview
    ? (featured.length ? featured : projects).slice(0, 3)
    : projects.filter((p) => filter === "all" || p.filter === filter);

  return (
    <section
      id="work"
      className={`relative overflow-hidden ${preview ? "border-t border-line bg-surface py-28" : "pt-32 pb-28"}`}
    >
      <div className="pointer-events-none absolute bottom-0 left-1/4 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {!preview && <BackLink href={`/${lang}`}>{common.back}</BackLink>}
        <SectionHeader
          as={preview ? "h2" : "h1"}
          label={work.label}
          title={work.title}
          intro={work.intro}
          aside={preview && <ViewAllLink href={`/${lang}/work`}>{common.viewAll}</ViewAllLink>}
        />

        {!preview && (
          <div className="-mt-4 mb-10 flex flex-wrap gap-2 text-sm">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-full border px-4 py-2 transition-all duration-300 ${
                  filter === f
                    ? "border-accent bg-accent font-semibold text-accent-fg"
                    : "border-line text-muted hover:border-accent hover:text-accent"
                }`}
              >
                {work.filters[f]}
              </button>
            ))}
          </div>
        )}

        <motion.div layout className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="popLayout">
            {items.map((p) => (
              <motion.article
                key={p.slug}
                layout
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.96 }}
                transition={{ duration: 0.3 }}
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-line bg-bg transition-colors duration-300 hover:border-accent"
              >
                <div className="relative h-48 overflow-hidden border-b border-line">
                  {p.image ? (
                    <Image
                      src={p.image}
                      alt={p.title}
                      fill
                      sizes="(min-width: 1024px) 24rem, (min-width: 768px) 50vw, 100vw"
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <CaseVisual kind={p.visual} className="h-full w-full" />
                  )}
                  <span className="absolute top-3 right-3 rounded-full border border-accent/30 bg-bg/90 px-2.5 py-0.5 font-mono text-[10px] uppercase text-accent backdrop-blur-md">
                    {p.tag}
                  </span>
                  <span className="absolute top-3 left-3 rounded-full bg-bg/80 px-2.5 py-0.5 font-mono text-[10px] text-muted backdrop-blur-md">
                    {p.id}
                  </span>
                </div>

                <div className="flex flex-1 flex-col justify-between p-6">
                  <div>
                    <h3 className="mb-2 font-display text-xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                      {p.title}
                    </h3>
                    <p className="mb-6 text-sm leading-relaxed text-muted">{p.description}</p>
                  </div>
                  <div className="flex flex-wrap items-center justify-between gap-3 border-t border-line pt-4">
                    <div className="flex flex-wrap gap-1.5">
                      {p.tools.map((t) => (
                        <span key={t} className="rounded-full border border-line px-2.5 py-0.5 text-xs text-muted">
                          {t}
                        </span>
                      ))}
                    </div>
                    {p.url && (
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-accent"
                      >
                        {work.explore}
                        <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                      </a>
                    )}
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>

        {!preview && (
          <Reveal className="mt-14 flex flex-col items-center gap-6 text-center">
            <p className="font-display text-2xl font-medium">{work.cta}</p>
            <ArrowButton href={`/${lang}#contact`}>{work.ctaButton}</ArrowButton>
          </Reveal>
        )}
      </div>
    </section>
  );
}

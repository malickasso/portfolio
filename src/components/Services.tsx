import { ArrowUpRight, Check } from "lucide-react";
import Link from "next/link";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import { BackLink, Reveal, SectionHeader, ViewAllLink } from "./ui";

type Props = {
  services: Dictionary["services"];
  common: Dictionary["common"];
  lang: Locale;
  preview?: boolean;
};

export default function Services({ services, common, lang, preview }: Props) {
  const items = preview ? services.items.slice(0, 3) : services.items;

  return (
    <section
      id="services"
      className={`relative overflow-hidden ${preview ? "border-t border-line py-20 sm:py-28" : "pt-28 pb-20 sm:pt-32 sm:pb-28"}`}
    >
      <div className="pointer-events-none absolute top-1/3 right-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {!preview && <BackLink href={`/${lang}`}>{common.back}</BackLink>}
        <SectionHeader
          as={preview ? "h2" : "h1"}
          label={services.label}
          title={services.title}
          intro={services.intro}
          aside={preview && <ViewAllLink href={`/${lang}/services`}>{common.viewAll}</ViewAllLink>}
        />

        <div className={`grid gap-6 ${preview ? "md:grid-cols-2 lg:grid-cols-3" : "md:grid-cols-2"}`}>
          {items.map((s, i) => (
            <Reveal key={s.code} delay={(i % 3) * 0.08} className={preview && i === 2 ? "md:col-span-2 lg:col-span-1" : undefined}>
              <article className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent sm:p-8">
                <div>
                  <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs text-accent">
                        {s.tag}
                      </span>
                      <span className="font-mono text-xs text-muted">{s.code}</span>
                    </div>
                    <span className="rounded-full border border-line px-2.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-muted">
                      {s.badge}
                    </span>
                  </div>

                  <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {s.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted">{s.text}</p>

                  <ul className="mb-8 space-y-2.5">
                    {s.deliverables.map((d) => (
                      <li key={d} className="flex items-start gap-2.5 text-sm">
                        <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                        <span>{d}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
                  <span className="text-xs text-muted">{services.sla}</span>
                  <Link
                    href={`/${lang}#contact`}
                    className="group/btn inline-flex items-center gap-2 rounded-full border border-accent/40 px-4 py-2 text-sm font-medium text-accent transition-all duration-300 hover:bg-accent hover:text-accent-fg"
                  >
                    {services.cta}
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover/btn:rotate-45" />
                  </Link>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

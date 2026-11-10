import { ExternalLink, FileText, GraduationCap, ShieldCheck } from "lucide-react";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import type { Certification } from "@/lib/content";
import { BackLink, Reveal, SectionHeader, ViewAllLink } from "./ui";

type Props = {
  certs: Dictionary["certs"];
  common: Dictionary["common"];
  lang: Locale;
  items: Certification[];
  preview?: boolean;
};

export default function Certs({ certs, common, lang, items, preview }: Props) {
  const list = preview
    ? [...items.filter((c) => c.featured), ...items.filter((c) => !c.featured)].slice(0, 3)
    : items;

  return (
    <section
      id="certs"
      className={`relative overflow-hidden ${preview ? "border-t border-line bg-surface py-28" : "pt-32 pb-28"}`}
    >
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {!preview && <BackLink href={`/${lang}`}>{common.back}</BackLink>}
        <SectionHeader
          as={preview ? "h2" : "h1"}
          label={certs.label}
          title={certs.title}
          intro={certs.intro}
          aside={preview && <ViewAllLink href={`/${lang}/certifications`}>{common.viewAll}</ViewAllLink>}
        />

        {list.length === 0 && <p className="text-muted">{certs.empty}</p>}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {list.map((c, i) => (
            <Reveal key={c.slug} delay={(i % 3) * 0.08}>
              <article
                className={`group flex h-full flex-col justify-between rounded-3xl border p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent ${
                  preview ? "bg-bg" : "bg-surface"
                } ${c.featured ? "border-accent/40" : "border-line"}`}
              >
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-line bg-surface-2 text-accent">
                      <ShieldCheck className="h-5 w-5" />
                    </span>
                    <span className="font-mono text-xs text-muted">{c.dateLabel}</span>
                  </div>
                  <p className="font-mono text-xs uppercase tracking-wider text-accent">{c.issuer}</p>
                  <h3 className="mt-2 font-display text-xl font-semibold tracking-tight">{c.name}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{c.summary}</p>
                </div>

                {(c.pdf || c.credentialUrl) && (
                  <div className="mt-6 flex flex-wrap gap-2 border-t border-line pt-5">
                    {c.pdf && (
                      <a
                        href={c.pdf}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-2 text-xs font-semibold text-accent-fg transition hover:opacity-90"
                      >
                        <FileText className="h-3.5 w-3.5" /> {certs.pdf}
                      </a>
                    )}
                    {c.credentialUrl && (
                      <a
                        href={c.credentialUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-xs font-medium transition hover:border-accent hover:text-accent"
                      >
                        <ExternalLink className="h-3.5 w-3.5" /> {certs.verify}
                      </a>
                    )}
                  </div>
                )}
              </article>
            </Reveal>
          ))}
        </div>

        {!preview && (
          <Reveal className="mt-20">
            <p className="mb-6 flex items-center gap-3 font-mono text-xs uppercase tracking-[0.2em] text-muted">
              <GraduationCap className="h-4 w-4 text-accent" /> {certs.educationTitle}
            </p>
            <div className="grid gap-6 md:grid-cols-2">
              {certs.education.map((e) => (
                <div key={e.degree} className="rounded-3xl border border-line bg-surface p-7">
                  <p className="font-mono text-xs text-muted">{e.period}</p>
                  <p className="mt-2 font-display text-xl font-semibold">{e.degree}</p>
                  <p className="text-sm text-muted">{e.school}</p>
                </div>
              ))}
            </div>
          </Reveal>
        )}
      </div>
    </section>
  );
}

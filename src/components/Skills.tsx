import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import TechBadge from "./TechBadge";
import { BackLink, Reveal, SectionHeader, ViewAllLink } from "./ui";

type Props = {
  skills: Dictionary["skills"];
  common: Dictionary["common"];
  lang: Locale;
  preview?: boolean;
};

export default function Skills({ skills, common, lang, preview }: Props) {
  const items = preview ? skills.items.slice(0, 3) : skills.items;

  return (
    <section
      id="skills"
      className={`relative overflow-hidden ${preview ? "border-t border-line py-28" : "pt-32 pb-28"}`}
    >
      <div className="pointer-events-none absolute top-1/2 left-0 h-80 w-80 rounded-full bg-accent/5 blur-3xl" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        {!preview && <BackLink href={`/${lang}`}>{common.back}</BackLink>}
        <SectionHeader
          as={preview ? "h2" : "h1"}
          label={skills.label}
          title={skills.title}
          intro={skills.intro}
          aside={preview && <ViewAllLink href={`/${lang}/skills`}>{common.viewAll}</ViewAllLink>}
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {items.map((s, i) => (
            <Reveal key={s.tag} delay={(i % 3) * 0.08}>
              <article className="group flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-7 transition-all duration-300 hover:-translate-y-1 hover:border-accent">
                <div>
                  <div className="mb-6 flex items-center justify-between">
                    <span className="rounded-full border border-accent/20 bg-accent/10 px-3 py-1 font-mono text-xs uppercase text-accent">
                      {s.tag}
                    </span>
                    <span className="font-mono text-xs text-muted">{String(i + 1).padStart(2, "0")}</span>
                  </div>
                  <h3 className="mb-3 font-display text-2xl font-semibold tracking-tight transition-colors group-hover:text-accent">
                    {s.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-muted">{s.text}</p>
                  <div className="mb-8 flex flex-wrap gap-2">
                    {s.stack.map((t) => (
                      <TechBadge key={t} name={t} />
                    ))}
                  </div>
                </div>
                <div className="flex items-center justify-between gap-4 border-t border-line pt-5 text-sm">
                  <span className="shrink-0 whitespace-nowrap font-mono text-xs uppercase tracking-wider text-muted">
                    {skills.scopeLabel}
                  </span>
                  <span className="text-right font-medium text-accent">{s.scope}</span>
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}

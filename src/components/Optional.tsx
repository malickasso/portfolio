import { Check, Quote } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { Reveal, SectionHeader } from "./ui";

// Sections prêtes à activer : renseignez le contenu dans content/fr.ts et en.ts,
// puis passez le drapeau correspondant à true dans content/site.ts.

export function Testimonials({ data }: { data: Dictionary["testimonials"] }) {
  if (!data.items.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 sm:px-8">
      <SectionHeader label={data.label} title={data.title} />
      <div className="grid gap-4 md:grid-cols-2">
        {data.items.map((t, i) => (
          <Reveal key={t.name} delay={i * 0.1}>
            <figure className="h-full rounded-3xl border border-line bg-surface p-8">
              <Quote className="h-6 w-6 text-accent" />
              <blockquote className="mt-4 text-lg">{t.quote}</blockquote>
              <figcaption className="mt-6 text-sm text-muted">
                <span className="font-medium text-fg">{t.name}</span> — {t.role}
              </figcaption>
            </figure>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Offers({ data }: { data: Dictionary["offers"] }) {
  if (!data.items.length) return null;
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:py-28 sm:px-8">
      <SectionHeader label={data.label} title={data.title} />
      <div className="grid gap-4 md:grid-cols-3">
        {data.items.map((o, i) => (
          <Reveal key={o.name} delay={i * 0.1}>
            <div className="h-full rounded-3xl border border-line bg-surface p-8">
              <h3 className="font-display text-xl font-semibold">{o.name}</h3>
              <p className="mt-2 font-display text-3xl font-semibold text-accent">{o.price}</p>
              <ul className="mt-6 space-y-2 text-sm text-muted">
                {o.features.map((f) => (
                  <li key={f} className="flex gap-2">
                    <Check className="h-4 w-4 text-accent" /> {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

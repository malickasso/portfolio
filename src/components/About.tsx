import { ShieldCheck } from "lucide-react";
import type { Dictionary } from "@/content/types";
import { site } from "@/content/site";
import { Label, Reveal } from "./ui";

export default function About({ about }: { about: Dictionary["about"] }) {
  return (
    <section id="about" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <Reveal>
        <Label>{about.label}</Label>
        <p className="mt-6 max-w-5xl font-display text-3xl font-medium leading-tight tracking-tight sm:text-5xl">
          {about.statement.map((part) => (
            <span key={part.text} className={part.highlight ? "text-accent" : "text-muted"}>
              {part.text}
            </span>
          ))}
        </p>
      </Reveal>

      <div className="mt-16 grid gap-12 lg:grid-cols-2">
        <Reveal delay={0.1}>
          <div className="space-y-5 text-lg leading-relaxed text-muted">
            {about.body.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <div className="mt-8 flex items-center gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-full border border-line bg-surface">
              <ShieldCheck className="h-5 w-5 text-accent" />
            </span>
            <div>
              <p className="font-medium">{site.fullName}</p>
              <p className="font-mono text-xs text-muted">{about.signatureRole}</p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <SpecCard spec={about.spec} />
        </Reveal>
      </div>
    </section>
  );
}

function SpecCard({ spec }: { spec: Dictionary["about"]["spec"] }) {
  const rows = [
    { label: spec.identity, value: "ASSOUMA Abdou Malick", className: "font-semibold" },
    { label: spec.location, value: spec.locationValue },
    { label: spec.education, value: spec.educationValue, className: "text-accent" },
    { label: spec.email, value: site.email, href: `mailto:${site.email}` },
    { label: spec.github, value: "@malickasso", href: site.github },
  ];

  const btn =
    "group flex w-full items-center justify-center gap-1.5 border px-4 py-3 text-sm font-semibold transition-all duration-300";

  return (
    <div className="flex h-full flex-col justify-between rounded-3xl border border-line bg-surface p-6 sm:p-8">
      <div>
        <div className="mb-6 flex items-center justify-between border-b border-line pb-4">
          <span className="font-mono text-xs text-muted">{`// ${spec.title}`}</span>
          <div className="flex gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-red-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-yellow-500/80" />
            <span className="h-2.5 w-2.5 rounded-full bg-green-500/80" />
          </div>
        </div>

        <dl className="space-y-4 text-sm">
          {rows.map((r, i) => (
            <div
              key={r.label}
              className={`flex flex-wrap justify-between gap-x-4 gap-y-1 ${
                i < rows.length - 1 ? "border-b border-line pb-3" : ""
              }`}
            >
              <dt className="font-mono text-xs uppercase tracking-wider text-muted">{r.label}</dt>
              <dd className={`break-all text-right ${r.className ?? ""}`}>
                {r.href ? (
                  <a
                    href={r.href}
                    target={r.href.startsWith("http") ? "_blank" : undefined}
                    rel="noreferrer"
                    className="transition-colors hover:text-accent"
                  >
                    {r.value}
                  </a>
                ) : (
                  r.value
                )}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <div className="mt-8 border-t border-line pt-4">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-widest text-muted">
          {`// ${spec.cvTitle}`}
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <a
            href={site.cv}
            download
            className={`${btn} rounded-full border-accent bg-accent text-accent-fg hover:bg-transparent hover:text-accent`}
          >
            <span>CV [FR]</span>
            <span className="transition-transform group-hover:translate-y-0.5">&darr;</span>
          </a>
          {site.cvEn ? (
            <a
              href={site.cvEn}
              download
              className={`${btn} rounded-full border-line bg-bg text-fg hover:border-accent hover:text-accent`}
            >
              <span>CV [EN]</span>
              <span className="transition-transform group-hover:translate-y-0.5">&darr;</span>
            </a>
          ) : (
            <span aria-disabled className={`${btn} cursor-not-allowed rounded-full border-line bg-bg text-muted opacity-60`}>
              CV [EN] · {spec.cvSoon}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

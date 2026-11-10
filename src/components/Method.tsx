"use client";

import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";
import { Label, Reveal } from "./ui";

export default function Method({ method }: { method: Dictionary["method"] }) {
  const [active, setActive] = useState(0);
  const refs = useRef<(HTMLLIElement | null)[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(Number((e.target as HTMLElement).dataset.index));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
    refs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const total = method.steps.length;

  return (
    <section id="method" className="border-t border-line">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 sm:py-28 sm:px-8 lg:grid-cols-[1fr_1.3fr]">
        <div className="lg:sticky lg:top-32 lg:self-start">
          <Reveal>
            <Label>{method.label}</Label>
            <h2 className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
              {method.title}
            </h2>
            <p className="mt-5 max-w-sm text-muted">{method.intro}</p>
            <div className="mt-10 flex items-end gap-4">
              <span className="font-display text-6xl font-semibold tabular-nums">
                {active + 1}
                <span className="text-2xl text-muted">/{total}</span>
              </span>
              <div className="pb-2 text-sm">
                <p className="text-muted">{method.current}</p>
                <p className="font-medium text-accent">{method.steps[active].title}</p>
              </div>
            </div>
            <div className="mt-6 h-1 max-w-xs overflow-hidden rounded-full bg-line">
              <div
                className="h-full rounded-full bg-accent transition-all duration-500"
                style={{ width: `${((active + 1) / total) * 100}%` }}
              />
            </div>
          </Reveal>
        </div>

        <ol className="relative border-l border-line">
          {method.steps.map((s, i) => {
            const on = i <= active;
            return (
              <li
                key={s.title}
                data-index={i}
                ref={(el) => {
                  refs.current[i] = el;
                }}
                className="relative pb-14 pl-10 last:pb-0"
              >
                <span
                  className={`absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2 transition-all duration-500 ${
                    on ? "border-accent bg-accent shadow-[0_0_0_5px_color-mix(in_srgb,var(--accent)_20%,transparent)]" : "border-line bg-bg"
                  }`}
                />
                <div className={`transition-opacity duration-500 ${on ? "opacity-100" : "opacity-50"}`}>
                  <p className="font-mono text-xs text-muted">0{i + 1}</p>
                  <h3 className="mt-1 font-display text-2xl font-semibold tracking-tight">{s.title}</h3>
                  <p className="mt-3 max-w-lg text-muted">{s.text}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {s.deliverables.map((d) => (
                      <span key={d} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                        {d}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}

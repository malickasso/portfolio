"use client";

import { animate, useInView } from "motion/react";
import { useEffect, useRef, useState } from "react";
import type { Dictionary } from "@/content/types";

function Counter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);

  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, value, {
      duration: 1.6,
      ease: "easeOut",
      onUpdate: (v) => setN(Math.round(v)),
    });
    return () => controls.stop();
  }, [inView, value]);

  return (
    <span ref={ref}>
      <span className="js-only">{n}</span>
      <noscript>{value}</noscript>
      <span className="text-accent">{suffix}</span>
    </span>
  );
}

export default function Stats({ stats }: { stats: Dictionary["stats"] }) {
  return (
    <section className="border-y border-line">
      <div className="mx-auto grid max-w-7xl grid-cols-2 md:grid-cols-4">
        {stats.map((s, i) => (
          <div
            key={s.label}
            className={`px-5 py-10 sm:px-8 ${i % 2 === 1 ? "border-l border-line" : ""} ${
              i >= 2 ? "border-t border-line md:border-t-0" : ""
            } ${i === 2 ? "md:border-l" : ""}`}
          >
            <p className="font-display text-5xl font-semibold tracking-tight">
              <Counter value={s.value} suffix={s.suffix} />
            </p>
            <p className="mt-2 text-sm text-muted">{s.label}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

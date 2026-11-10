"use client";

import { motion, useInView } from "motion/react";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

const CHARS = "ABCDEF0123456789#$%&/<>";

/** Étiquette mono qui se « décrypte » à l'apparition. */
export function Label({ children }: { children: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const [text, setText] = useState(children);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const total = children.length * 3;
    const id = setInterval(() => {
      frame++;
      const fixed = Math.floor(frame / 3);
      setText(
        children
          .split("")
          .map((c, i) =>
            i < fixed || c === " " ? c : CHARS[Math.floor(Math.random() * CHARS.length)],
          )
          .join(""),
      );
      if (frame >= total) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  }, [inView, children]);

  return (
    <span ref={ref} className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.2em] text-accent">
      <span className="text-muted">{"//"}</span>
      {text}
    </span>
  );
}

export function ArrowButton({
  href,
  children,
  variant = "primary",
  external,
}: {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
}) {
  const base =
    "group inline-flex items-center gap-3 rounded-full text-sm font-medium transition-all duration-300";
  const styles =
    variant === "primary"
      ? "bg-fg py-1.5 pl-6 pr-1.5 text-bg hover:shadow-[0_0_0_4px_var(--line)]"
      : "border border-line px-6 py-3 text-fg hover:border-fg";
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className={`${base} ${styles}`}
    >
      {children}
      {variant === "primary" && (
        <span className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-full bg-accent text-accent-fg">
          <ArrowUpRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-4 group-hover:-translate-y-4" />
          <ArrowUpRight className="absolute h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-0 group-hover:translate-y-0" />
        </span>
      )}
    </a>
  );
}

export function ViewAllLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group inline-flex shrink-0 items-center gap-2 whitespace-nowrap rounded-full border border-line px-5 py-2.5 text-sm font-medium text-fg transition-all duration-300 hover:border-accent hover:text-accent"
    >
      {children}
      <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

export function BackLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <Link
      href={href}
      className="group mb-10 inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-accent"
    >
      <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-1" />
      {children}
    </Link>
  );
}

export function SectionHeader({
  label,
  title,
  intro,
  aside,
  as: Heading = "h2",
}: {
  label: string;
  title: string;
  intro?: string;
  aside?: ReactNode;
  as?: "h1" | "h2";
}) {
  return (
    <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
      <Reveal className="max-w-2xl">
        <Label>{label}</Label>
        <Heading className="mt-4 font-display text-4xl font-semibold leading-[1.05] tracking-tight sm:text-5xl">
          {title}
        </Heading>
        {intro && <p className="mt-5 max-w-xl text-muted">{intro}</p>}
      </Reveal>
      {aside && <Reveal delay={0.1} className="shrink-0">{aside}</Reveal>}
    </div>
  );
}

export function GithubIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.29 1.19-3.1-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.84 1.19 3.1 0 4.42-2.7 5.4-5.26 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  );
}

export function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function WhatsappIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.25-.46-2.38-1.47-.88-.79-1.47-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.48-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35ZM12.05 21.5h-.01a9.47 9.47 0 0 1-4.83-1.32l-.35-.21-3.59.94.96-3.5-.23-.36a9.46 9.46 0 0 1-1.45-5.05c0-5.23 4.26-9.49 9.5-9.49 2.54 0 4.92.99 6.71 2.79a9.43 9.43 0 0 1 2.78 6.71c0 5.24-4.26 9.49-9.49 9.49Zm8.08-17.57A11.35 11.35 0 0 0 12.05.5C5.76.5.64 5.62.64 11.91c0 2.01.52 3.97 1.52 5.7L.54 23.5l6.03-1.58a11.4 11.4 0 0 0 5.47 1.39h.01c6.29 0 11.41-5.12 11.41-11.41 0-3.05-1.19-5.91-3.34-8.07Z" />
    </svg>
  );
}

// Logo façon balise JSX : <Malick ASSOUMA />
export function Logo({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-baseline whitespace-nowrap font-mono font-semibold tracking-tight ${className}`}>
      <span className="text-accent">&lt;</span>
      <span>Malick</span>
      <span className="ml-[0.5ch] text-accent">ASSOUMA</span>
      <span className="logo-cursor ml-[0.15ch] text-accent" aria-hidden="true">_</span>
      <span className="ml-[0.35ch] text-accent">/&gt;</span>
    </span>
  );
}

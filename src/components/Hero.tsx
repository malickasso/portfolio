"use client";

import { motion } from "motion/react";
import { CalendarCheck, ShieldCheck } from "lucide-react";
import Image from "next/image";
import type { HeroContent } from "@/lib/content";
import { site } from "@/content/site";
import { ArrowButton, GithubIcon, LinkedinIcon, WhatsappIcon } from "./ui";

const ease = [0.22, 1, 0.36, 1] as const;

export default function Hero({ hero }: { hero: HeroContent }) {
  const [first, ...rest] = hero.headline.trim().split(/\s+/);
  const lines = [first, rest.join(" ")].filter(Boolean);

  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32">
      <div className="grid-bg pointer-events-none absolute inset-0" />
      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.25fr_1fr]">
        <div>
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-sm text-muted"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-accent" />
            </span>
            <CalendarCheck className="h-4 w-4" />
            {hero.badge}
          </motion.span>

          <h1 className="mt-8 font-display text-6xl font-bold leading-[0.92] tracking-tighter sm:text-8xl xl:text-9xl">
            {lines.map((word, i) => (
              <span key={i} className="block overflow-hidden pb-2">
                <motion.span
                  className="block"
                  initial={{ y: "105%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease }}
                >
                  {word}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease }}
            className="mt-8 max-w-xl text-lg leading-relaxed text-muted"
          >
            {hero.sub}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.65, ease }}
            className="mt-10 flex flex-wrap items-center gap-4"
          >
            <ArrowButton href="#contact">{hero.ctaPrimary}</ArrowButton>
            <ArrowButton href="#work" variant="ghost">
              {hero.ctaSecondary}
            </ArrowButton>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.3, ease }}
          className="corners relative mx-auto aspect-[4/5] w-full max-w-md overflow-hidden rounded-3xl border border-line bg-surface"
        >
          {hero.photo ? (
            <Image
              src={hero.photo}
              alt={site.fullName}
              fill
              priority
              sizes="(min-width: 1024px) 28rem, 90vw"
              className="object-cover"
            />
          ) : (
            <div className="grid-bg absolute inset-0 flex flex-col items-center justify-center gap-4 text-muted">
              <div className="flex h-28 w-28 items-center justify-center rounded-full border border-line bg-surface-2">
                <ShieldCheck className="h-12 w-12 text-accent" strokeWidth={1.3} />
              </div>
              <span className="font-mono text-xs uppercase tracking-[0.2em]">
                {hero.photoPlaceholder}
              </span>
            </div>
          )}

          <div className="absolute inset-x-4 bottom-4 flex items-center justify-between gap-3 rounded-2xl border border-line bg-bg/80 px-4 py-3 backdrop-blur-md">
            <span className="text-sm">{hero.photoCaption}</span>
            <div className="flex items-center gap-3 text-muted">
              <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg">
                <GithubIcon className="h-4 w-4" />
              </a>
              <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg">
                <LinkedinIcon className="h-4 w-4" />
              </a>
              <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-fg">
                <WhatsappIcon className="h-4 w-4" />
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

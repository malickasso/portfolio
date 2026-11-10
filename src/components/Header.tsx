"use client";

import { AnimatePresence, motion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import { Logo } from "./ui";

export default function Header({ lang, nav }: { lang: Locale; nav: Dictionary["nav"] }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { resolvedTheme, setTheme } = useTheme();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const pathname = usePathname();
  const switchTo = (l: Locale) => pathname.replace(/^\/(fr|en)(?=\/|$)/, `/${l}`) || `/${l}`;
  const home = `/${lang}`;

  const links = [
    { href: `${home}#about`, label: nav.about },
    { href: `${home}#skills`, label: nav.skills },
    { href: `${home}#work`, label: nav.work },
    { href: `${home}#services`, label: nav.services },
    { href: `${home}/blog`, label: nav.blog },
  ];

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        open ? "border-b border-line bg-bg" : scrolled ? "border-b border-line bg-bg/80 backdrop-blur-md" : "border-b border-transparent"
      }`}
    >
      <div className="mx-auto flex h-18 max-w-7xl items-center justify-between gap-4 px-5 sm:px-8">
        <Link href={home} aria-label="Malick Assouma" className="group text-base sm:text-lg">
          <Logo />
        </Link>

        <nav className="hidden lg:block">
          <ul className="flex items-center gap-6 text-sm text-muted xl:gap-8">
            {links.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="transition-colors hover:text-fg">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden items-center rounded-full border border-line px-3 py-2 font-mono text-xs sm:flex">
            <Link href={switchTo("fr")} scroll={false} className={lang === "fr" ? "text-fg" : "text-muted hover:text-fg"}>
              FR
            </Link>
            <span className="px-1.5 text-muted">/</span>
            <Link href={switchTo("en")} scroll={false} className={lang === "en" ? "text-fg" : "text-muted hover:text-fg"}>
              EN
            </Link>
          </div>
          <button
            onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
            aria-label={nav.theme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-muted transition hover:text-fg"
          >
            <Sun className="h-4 w-4 light:hidden" />
            <Moon className="hidden h-4 w-4 light:block" />
          </button>
          <Link
            href={`${home}#contact`}
            className="group hidden items-center gap-2 rounded-full bg-fg py-1.5 pl-5 pr-1.5 text-sm font-medium text-bg md:inline-flex"
          >
            {nav.cta}
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-accent text-accent-fg">
              <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:rotate-45" />
            </span>
          </Link>
          <button
            onClick={() => setOpen(!open)}
            aria-label={nav.menu}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-line lg:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-line bg-bg lg:hidden"
          >
            <ul className="space-y-1 px-5 py-4">
              {[...links, { href: `${home}#contact`, label: nav.contact }].map((l) => (
                <li key={l.href}>
                  <Link
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block py-2 font-display text-2xl font-medium"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
              <li className="flex gap-4 pt-3 font-mono text-sm">
                <Link href={switchTo("fr")} scroll={false} className={lang === "fr" ? "text-accent" : "text-muted"}>FR</Link>
                <Link href={switchTo("en")} scroll={false} className={lang === "en" ? "text-accent" : "text-muted"}>EN</Link>
              </li>
            </ul>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

import Link from "next/link";
import type { Locale } from "@/content";
import type { Dictionary } from "@/content/types";
import { site } from "@/content/site";
import { GithubIcon, LinkedinIcon, Logo, WhatsappIcon } from "./ui";

export default function Footer({ footer, nav, lang }: { footer: Dictionary["footer"]; nav: Dictionary["nav"]; lang: Locale }) {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-center md:justify-between">
        <div>
          <p className="text-xl sm:text-2xl">
            <Logo />
          </p>
          <p className="mt-1 text-xs text-muted">
            © 2026 {site.fullName}. {footer.rights} <span className="text-accent">{"// "}{footer.tagline}</span>
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-6 text-sm text-muted">
          <Link href={`/${lang}/work`} className="hover:text-fg">{nav.work}</Link>
          <Link href={`/${lang}/skills`} className="hover:text-fg">{nav.skills}</Link>
          <Link href={`/${lang}/services`} className="hover:text-fg">{nav.services}</Link>
          <Link href={`/${lang}/certifications`} className="hover:text-fg">{nav.certs}</Link>
          <Link href={`/${lang}/blog`} className="hover:text-fg">{nav.blog}</Link>
          <a href={site.cv} className="hover:text-fg">CV (PDF)</a>
          <span className="flex items-center gap-4">
            <a href={site.github} target="_blank" rel="noreferrer" aria-label="GitHub" className="hover:text-fg">
              <GithubIcon className="h-5 w-5" />
            </a>
            <a href={site.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn" className="hover:text-fg">
              <LinkedinIcon className="h-5 w-5" />
            </a>
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noreferrer" aria-label="WhatsApp" className="hover:text-fg">
              <WhatsappIcon className="h-5 w-5" />
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

export function WhatsappFab() {
  return (
    <a
      href={`https://wa.me/${site.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      aria-label="WhatsApp"
      className="fixed right-4 bottom-4 z-40 flex h-12 w-12 items-center justify-center rounded-full bg-[#25d366] text-black shadow-lg transition hover:scale-110 sm:right-5 sm:bottom-5 sm:h-14 sm:w-14"
    >
      <WhatsappIcon className="h-6 w-6 sm:h-7 sm:w-7" />
    </a>
  );
}

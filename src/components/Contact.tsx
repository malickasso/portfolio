"use client";

import { AnimatePresence, motion } from "motion/react";
import { AlertTriangle, ArrowUpRight, CheckCircle2, FileText, Loader2, Mail } from "lucide-react";
import { useState, type FormEvent } from "react";
import type { Dictionary } from "@/content/types";
import { contactSubjects, site, type ContactSubject } from "@/content/site";
import { Label, Reveal, WhatsappIcon } from "./ui";

type Status = "idle" | "sending" | "success" | "error";

const field =
  "w-full rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent";

export default function Contact({ contact }: { contact: Dictionary["contact"] }) {
  const [status, setStatus] = useState<Status>("idle");
  const [subject, setSubject] = useState<ContactSubject | "">("");
  const f = contact.form;

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(new FormData(form))),
      });
      if (!res.ok) throw new Error();
      setStatus("success");
      form.reset();
      setSubject("");
    } catch {
      setStatus("error");
    }
  }

  const channels = [
    { icon: <Mail className="h-5 w-5" />, label: contact.channels.email, value: site.email, href: `mailto:${site.email}` },
    {
      icon: <WhatsappIcon className="h-5 w-5" />,
      label: contact.channels.whatsapp,
      value: site.whatsappDisplay,
      href: `https://wa.me/${site.whatsapp}`,
    },
    { icon: <FileText className="h-5 w-5" />, label: contact.channels.cvHint, value: contact.channels.cv, href: site.cv },
  ];

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-28 sm:px-8">
      <div className="grid gap-14 lg:grid-cols-2">
        <Reveal>
          <Label>{contact.label}</Label>
          <h2 className="mt-4 font-display text-5xl font-semibold leading-[1] tracking-tight sm:text-6xl">
            {contact.title}
          </h2>
          <p className="mt-6 max-w-md text-muted">{contact.intro}</p>

          <ul className="mt-10 divide-y divide-line border-y border-line">
            {channels.map((c) => (
              <li key={c.label}>
                <a
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel="noreferrer"
                  className="group flex items-center gap-4 py-5"
                >
                  <span className="flex h-11 w-11 items-center justify-center rounded-full border border-line text-accent">
                    {c.icon}
                  </span>
                  <span className="flex-1">
                    <span className="block break-all font-medium">{c.value}</span>
                    <span className="text-sm text-muted">{c.label}</span>
                  </span>
                  <ArrowUpRight className="h-5 w-5 text-muted transition-transform group-hover:rotate-45 group-hover:text-accent" />
                </a>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} className="space-y-5 rounded-3xl border border-line bg-surface p-6 sm:p-8">
            <input type="text" name="company" tabIndex={-1} autoComplete="off" className="hidden" aria-hidden />
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block space-y-2 text-sm">
                <span className="text-muted">{f.name}</span>
                <input name="name" required minLength={2} maxLength={100} className={field} autoComplete="name" />
              </label>
              <label className="block space-y-2 text-sm">
                <span className="text-muted">{f.email}</span>
                <input name="email" type="email" required maxLength={200} className={field} autoComplete="email" />
              </label>
            </div>
            <label className="block space-y-2 text-sm">
              <span className="text-muted">{f.subject}</span>
              <select
                name="subject"
                required
                value={subject}
                onChange={(e) => setSubject(e.target.value as ContactSubject)}
                className={field}
              >
                <option value="" disabled>
                  {f.subjectPlaceholder}
                </option>
                {contactSubjects.map((s) => (
                  <option key={s} value={s}>
                    {f.subjects[s]}
                  </option>
                ))}
              </select>
            </label>

            <AnimatePresence>
              {subject === "incident" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="overflow-hidden"
                >
                  <div className="flex flex-wrap items-center gap-3 rounded-2xl border border-amber-500/40 bg-amber-500/10 p-4 text-sm">
                    <AlertTriangle className="h-5 w-5 shrink-0 text-amber-500" />
                    <span className="flex-1">{f.incident}</span>
                    <a
                      href={`https://wa.me/${site.whatsapp}`}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-[#25d366] px-4 py-2 font-medium text-black"
                    >
                      <WhatsappIcon className="h-4 w-4" /> {f.incidentCta}
                    </a>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            <label className="block space-y-2 text-sm">
              <span className="text-muted">{f.message}</span>
              <textarea name="message" required minLength={10} maxLength={5000} rows={6} className={`${field} resize-none`} />
              <span className="block text-xs text-muted">{f.messageHint}</span>
            </label>

            <button
              type="submit"
              disabled={status === "sending"}
              className="group inline-flex items-center gap-3 rounded-full bg-fg py-1.5 pl-6 pr-1.5 text-sm font-medium text-bg transition disabled:opacity-60"
            >
              {status === "sending" ? f.sending : f.submit}
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent text-accent-fg">
                {status === "sending" ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <ArrowUpRight className="h-4 w-4 transition-transform group-hover:rotate-45" />
                )}
              </span>
            </button>

            {status === "success" && (
              <p className="flex items-center gap-2 text-sm text-accent">
                <CheckCircle2 className="h-4 w-4" /> {f.success}
              </p>
            )}
            {status === "error" && (
              <p className="text-sm text-red-500">
                {f.error}{" "}
                <a href={`mailto:${site.email}`} className="underline">
                  {site.email}
                </a>
              </p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}

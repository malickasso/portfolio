import { contactSubjects, type ContactSubject } from "@/content/site";

export type ContactPayload = {
  name: string;
  email: string;
  subject: ContactSubject;
  message: string;
  company?: string; // champ piège anti-robots, doit rester vide
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContact(input: unknown): ContactPayload | null {
  if (!input || typeof input !== "object") return null;
  const d = input as Record<string, unknown>;
  const str = (v: unknown) => (typeof v === "string" ? v.trim() : "");

  const payload = {
    name: str(d.name),
    email: str(d.email),
    subject: str(d.subject) as ContactSubject,
    message: str(d.message),
    company: str(d.company),
  };

  // Pas de saut de ligne ni de caractère de contrôle dans les champs repris
  // dans les en-têtes de l'email (objet, reply-to).
  const CONTROL = /[\u0000-\u001f\u007f]/;
  if (CONTROL.test(payload.name) || CONTROL.test(payload.email)) return null;
  if (payload.name.length < 2 || payload.name.length > 100) return null;
  if (!EMAIL_RE.test(payload.email) || payload.email.length > 200) return null;
  if (!contactSubjects.includes(payload.subject)) return null;
  if (payload.message.length < 10 || payload.message.length > 5000) return null;
  return payload;
}

export function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

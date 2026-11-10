import type { ContactSubject } from "./site";

export type CaseVisual = "network" | "radar" | "flag" | "terminal" | "memory" | "headers" | "bucket" | "vms";

export type WorkFilter = "web" | "audit" | "network" | "soc" | "forensic" | "ctf";

export type Dictionary = {
  meta: { title: string; description: string };
  common: { viewAll: string; back: string; toTop: string };
  nav: {
    about: string;
    skills: string;
    work: string;
    services: string;
    method: string;
    certs: string;
    blog: string;
    contact: string;
    cta: string;
    theme: string;
    menu: string;
  };
  hero: {
    badge: string;
    headline: string;
    sub: string;
    ctaPrimary: string;
    ctaSecondary: string;
    photoCaption: string;
    photoPlaceholder: string;
  };
  stats: { value: number; suffix: string; label: string; source?: "certifications" }[];
  about: {
    label: string;
    statement: { text: string; highlight?: boolean }[];
    body: string[];
    signatureRole: string;
    spec: {
      title: string;
      identity: string;
      location: string;
      locationValue: string;
      education: string;
      educationValue: string;
      email: string;
      github: string;
      cvTitle: string;
      cvSoon: string;
    };
  };
  skills: {
    label: string;
    title: string;
    intro: string;
    scopeLabel: string;
    items: { tag: string; title: string; text: string; stackLabel: string; stack: string[]; scope: string }[];
  };
  work: {
    label: string;
    title: string;
    intro: string;
    filters: Record<WorkFilter | "all", string>;
    explore: string;
    cta: string;
    ctaButton: string;
  };
  services: {
    label: string;
    title: string;
    intro: string;
    deliverablesLabel: string;
    sla: string;
    cta: string;
    items: { code: string; tag: string; badge: string; title: string; text: string; deliverables: string[] }[];
  };
  method: {
    label: string;
    title: string;
    intro: string;
    current: string;
    steps: { title: string; text: string; deliverables: string[] }[];
  };
  certs: {
    label: string;
    title: string;
    intro: string;
    pdf: string;
    verify: string;
    empty: string;
    educationTitle: string;
    education: { degree: string; school: string; period: string }[];
  };
  blog: {
    label: string;
    title: string;
    intro: string;
    readMore: string;
    empty: string;
    backToBlog: string;
  };
  testimonials: {
    label: string;
    title: string;
    items: { quote: string; name: string; role: string }[];
  };
  offers: {
    label: string;
    title: string;
    items: { name: string; price: string; features: string[] }[];
  };
  contact: {
    label: string;
    title: string;
    intro: string;
    channels: { email: string; whatsapp: string; cv: string; cvHint: string };
    form: {
      name: string;
      email: string;
      subject: string;
      subjectPlaceholder: string;
      subjects: Record<ContactSubject, string>;
      message: string;
      messageHint: string;
      submit: string;
      sending: string;
      success: string;
      error: string;
      incident: string;
      incidentCta: string;
    };
  };
  footer: { rights: string; tagline: string };
};

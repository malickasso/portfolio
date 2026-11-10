// Adresse publique : NEXT_PUBLIC_SITE_URL (domaine perso), sinon l'URL de
// production fournie par Vercel, sinon localhost.
const vercelUrl = process.env.NEXT_PUBLIC_VERCEL_PROJECT_PRODUCTION_URL;
const siteUrl = (
  process.env.NEXT_PUBLIC_SITE_URL || (vercelUrl ? `https://${vercelUrl}` : "http://localhost:3000")
).replace(/\/$/, "");

// Données non traduites : liens, contacts, options d'affichage.
export const site = {
  name: "Malick Assouma",
  fullName: "Abdou Malick ASSOUMA",
  url: siteUrl,
  email: "abdoumalickassouma804@gmail.com",
  whatsapp: "2290195459313",
  whatsappDisplay: "+229 01 95 45 93 13",
  linkedin: "https://www.linkedin.com/in/abdoumalick-assouma-63a878270",
  github: "https://github.com/malickasso",
  cv: "/CV_Abdou_Malick_ASSOUMA_Analyste_Cybersecurite.pdf",
  // CV anglais : déposez le PDF dans public/ puis indiquez son chemin.
  cvEn: null as string | null,
  // Déposez votre photo dans public/ puis indiquez son chemin, ex. "/photo.jpg".
  photo: null as string | null,
  // Sections prêtes à activer quand le contenu existe.
  features: {
    testimonials: false,
    offers: false,
  },
  tech: [
    "Wazuh",
    "Wireshark",
    "tshark",
    "Volatility 3",
    "Burp Suite",
    "Nmap",
    "Metasploit",
    "Kali Linux",
    "Parrot OS",
    "hashcat",
    "KVM / libvirt",
    "Docker",
    "Python",
    "Laravel",
    "Linux",
    "Git",
  ],
};

export const contactSubjects = [
  "audit",
  "siem",
  "incident",
  "training",
  "other",
] as const;
export type ContactSubject = (typeof contactSubjects)[number];

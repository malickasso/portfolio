import { collection, config, fields } from "@keystatic/core";

// GitHub dès que l'app GitHub est configurée (ou forcée pour la créer), sinon local.
export const useGithub =
  process.env.NEXT_PUBLIC_KEYSTATIC_STORAGE === "github" ||
  Boolean(process.env.NEXT_PUBLIC_KEYSTATIC_GITHUB_APP_SLUG);

// Date au format AAAA ou AAAA-MM (ex. 2026 ou 2026-07)
const monthField = (label: string, isRequired: boolean) =>
  fields.text({
    label,
    description: "Format AAAA-MM (ex. 2026-07) ou AAAA si le mois est inconnu.",
    validation: {
      isRequired,
      pattern: { regex: /^$|^\d{4}(-(0[1-9]|1[0-2]))?$/, message: "Utilise le format AAAA ou AAAA-MM" },
    },
  });

const optionalEn = (label: string, multiline = false) =>
  fields.text({ label, multiline, description: "Optionnel. Vide = le texte français est affiché." });

// Logo de l'admin : le « </> » du logo du site, dans le vert d'accent du thème actif.
function BrandMark({ colorScheme }: { colorScheme: "light" | "dark" }) {
  const dark = colorScheme === "dark";
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <rect width="24" height="24" rx="7" fill={dark ? "#2fe28a" : "#0f9f55"} />
      <path
        d="M9 8.5 5.5 12 9 15.5M15 8.5l3.5 3.5-3.5 3.5M13.2 7l-2.4 10"
        stroke={dark ? "#06130c" : "#ffffff"}
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export default config({
  locale: "fr-FR",
  storage: useGithub
    ? { kind: "github", repo: { owner: "malickasso", name: "portfolio" } }
    : { kind: "local" },
  ui: {
    brand: { name: "Malick ASSOUMA", mark: BrandMark },
    navigation: {
      Portfolio: ["projects", "certifications"],
      Blog: ["posts"],
    },
  },
  collections: {
    certifications: collection({
      label: "Certifications",
      path: "content/certifications/*",
      slugField: "name",
      format: { data: "yaml" },
      columns: ["name", "issuer", "date", "featured"],
      previewUrl: "/fr/certifications",
      schema: {
        name: fields.slug({ name: { label: "Nom de la certification", validation: { isRequired: true } } }),
        issuer: fields.text({ label: "Organisme", validation: { isRequired: true } }),
        date: monthField("Date d'obtention", true),
        summaryFr: fields.text({
          label: "Présentation (FR)",
          description: "Quelques phrases sur ce que couvre la certification.",
          multiline: true,
          validation: { isRequired: true },
        }),
        summaryEn: optionalEn("Présentation (EN)", true),
        pdf: fields.file({
          label: "Certificat (PDF)",
          directory: "public/certifications",
          publicPath: "/certifications/",
        }),
        credentialUrl: fields.url({ label: "Lien de vérification", description: "Optionnel : page officielle de vérification." }),
        featured: fields.checkbox({ label: "Mettre en avant sur l'accueil", defaultValue: false }),
      },
    }),

    projects: collection({
      label: "Projets",
      path: "content/projects/*",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["title", "category", "date", "featured"],
      previewUrl: "/fr/work",
      schema: {
        title: fields.slug({ name: { label: "Titre (FR)", validation: { isRequired: true } } }),
        titleEn: optionalEn("Titre (EN)"),
        category: fields.select({
          label: "Catégorie (filtre)",
          defaultValue: "web",
          options: [
            { label: "Web Dev", value: "web" },
            { label: "Sécurité / Audit", value: "audit" },
            { label: "Réseau & Infra", value: "network" },
            { label: "SOC / Détection", value: "soc" },
            { label: "Forensic", value: "forensic" },
            { label: "CTF", value: "ctf" },
          ],
        }),
        tagFr: fields.text({ label: "Étiquette (FR)", description: "Ex. : API REST, Pentest / Cloud", validation: { isRequired: true } }),
        tagEn: optionalEn("Étiquette (EN)"),
        date: monthField("Date de réalisation", false),
        descriptionFr: fields.text({ label: "Description (FR)", multiline: true, validation: { isRequired: true } }),
        descriptionEn: optionalEn("Description (EN)", true),
        tools: fields.array(fields.text({ label: "Outil" }), {
          label: "Outils / technologies",
          itemLabel: (p) => p.value,
        }),
        url: fields.url({ label: "URL du projet", description: "Site, dépôt GitHub ou rapport en ligne." }),
        image: fields.image({
          label: "Capture d'écran",
          description: "Optionnel. Sans image, le visuel ci-dessous est utilisé.",
          directory: "public/images/projects",
          publicPath: "/images/projects/",
        }),
        visual: fields.select({
          label: "Visuel de remplacement",
          defaultValue: "terminal",
          options: [
            { label: "Terminal", value: "terminal" },
            { label: "Réseau", value: "network" },
            { label: "Radar", value: "radar" },
            { label: "Drapeau CTF", value: "flag" },
            { label: "Mémoire (Volatility)", value: "memory" },
            { label: "En-têtes HTTP", value: "headers" },
            { label: "Bucket cloud", value: "bucket" },
            { label: "Machines virtuelles", value: "vms" },
          ],
        }),
        featured: fields.checkbox({ label: "Mettre en avant sur l'accueil", defaultValue: false }),
      },
    }),

    posts: collection({
      label: "Articles de blog",
      path: "content/posts/*/",
      slugField: "title",
      format: { data: "yaml" },
      columns: ["title", "date"],
      previewUrl: "/fr/blog/{slug}",
      schema: {
        title: fields.slug({ name: { label: "Titre (FR)", validation: { isRequired: true } } }),
        titleEn: optionalEn("Titre (EN)"),
        date: fields.date({ label: "Date de publication", validation: { isRequired: true } }),
        excerptFr: fields.text({ label: "Résumé (FR)", multiline: true, validation: { isRequired: true } }),
        excerptEn: optionalEn("Résumé (EN)", true),
        cover: fields.image({
          label: "Image de couverture",
          directory: "public/images/blog",
          publicPath: "/images/blog/",
        }),
        tags: fields.array(fields.text({ label: "Tag" }), { label: "Tags", itemLabel: (p) => p.value }),
        contentFr: fields.markdoc({
          label: "Article (FR)",
          options: { image: { directory: "public/images/blog", publicPath: "/images/blog/" } },
        }),
        contentEn: fields.markdoc({
          label: "Article (EN) — optionnel",
          options: { image: { directory: "public/images/blog", publicPath: "/images/blog/" } },
        }),
      },
    }),
  },
});

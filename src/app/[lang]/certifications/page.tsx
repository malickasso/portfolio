import Certs from "@/components/Certs";
import PageShell from "@/components/PageShell";
import { getCertifications } from "@/lib/content";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata({ params }: PageProps<"/[lang]/certifications">) {
  return subpageMetadata(params, "certifications", (d) => d.certs);
}

export default async function CertificationsPage({ params }: PageProps<"/[lang]/certifications">) {
  const { lang, dict } = await resolvePage(params);
  const items = await getCertifications(lang);
  return (
    <PageShell lang={lang} dict={dict}>
      <Certs certs={dict.certs} common={dict.common} lang={lang} items={items} />
    </PageShell>
  );
}

import Certs from "@/components/Certs";
import PageShell from "@/components/PageShell";
import { getCertifications } from "@/lib/content";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata() {
  return subpageMetadata("certifications", (d) => d.certs);
}

export default async function CertificationsPage() {
  const { lang, dict } = await resolvePage();
  const items = await getCertifications();
  return (
    <PageShell lang={lang} dict={dict}>
      <Certs certs={dict.certs} common={dict.common} lang={lang} items={items} />
    </PageShell>
  );
}

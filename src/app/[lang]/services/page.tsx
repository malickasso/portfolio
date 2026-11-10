import Method from "@/components/Method";
import PageShell from "@/components/PageShell";
import Services from "@/components/Services";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata() {
  return subpageMetadata("services", (d) => d.services);
}

export default async function ServicesPage() {
  const { lang, dict } = await resolvePage();
  return (
    <PageShell lang={lang} dict={dict}>
      <Services services={dict.services} common={dict.common} lang={lang} />
      <Method method={dict.method} />
    </PageShell>
  );
}

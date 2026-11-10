import Method from "@/components/Method";
import PageShell from "@/components/PageShell";
import Services from "@/components/Services";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata({ params }: PageProps<"/[lang]/services">) {
  return subpageMetadata(params, "services", (d) => d.services);
}

export default async function ServicesPage({ params }: PageProps<"/[lang]/services">) {
  const { lang, dict } = await resolvePage(params);
  return (
    <PageShell lang={lang} dict={dict}>
      <Services services={dict.services} common={dict.common} lang={lang} />
      <Method method={dict.method} />
    </PageShell>
  );
}

import PageShell from "@/components/PageShell";
import Work from "@/components/Work";
import { getProjects } from "@/lib/content";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata() {
  return subpageMetadata("work", (d) => d.work);
}

export default async function WorkPage() {
  const { lang, dict } = await resolvePage();
  const projects = await getProjects();
  return (
    <PageShell lang={lang} dict={dict}>
      <Work work={dict.work} common={dict.common} lang={lang} projects={projects} />
    </PageShell>
  );
}

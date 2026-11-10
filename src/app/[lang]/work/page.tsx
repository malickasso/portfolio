import PageShell from "@/components/PageShell";
import Work from "@/components/Work";
import { getProjects } from "@/lib/content";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata({ params }: PageProps<"/[lang]/work">) {
  return subpageMetadata(params, "work", (d) => d.work);
}

export default async function WorkPage({ params }: PageProps<"/[lang]/work">) {
  const { lang, dict } = await resolvePage(params);
  const projects = await getProjects(lang);
  return (
    <PageShell lang={lang} dict={dict}>
      <Work work={dict.work} common={dict.common} lang={lang} projects={projects} />
    </PageShell>
  );
}

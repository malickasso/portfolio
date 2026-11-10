import PageShell from "@/components/PageShell";
import Skills from "@/components/Skills";
import TechMarquee from "@/components/TechMarquee";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata({ params }: PageProps<"/[lang]/skills">) {
  return subpageMetadata(params, "skills", (d) => d.skills);
}

export default async function SkillsPage({ params }: PageProps<"/[lang]/skills">) {
  const { lang, dict } = await resolvePage(params);
  return (
    <PageShell lang={lang} dict={dict}>
      <Skills skills={dict.skills} common={dict.common} lang={lang} />
      <TechMarquee />
    </PageShell>
  );
}

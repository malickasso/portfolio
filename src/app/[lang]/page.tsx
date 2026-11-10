import About from "@/components/About";
import Blog from "@/components/Blog";
import Certs from "@/components/Certs";
import Contact from "@/components/Contact";
import Hero from "@/components/Hero";
import Method from "@/components/Method";
import { Offers, Testimonials } from "@/components/Optional";
import PageShell from "@/components/PageShell";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
import Stats from "@/components/Stats";
import TechMarquee from "@/components/TechMarquee";
import Work from "@/components/Work";
import { site } from "@/content/site";
import { getCertifications, getPosts, getProjects } from "@/lib/content";
import { resolvePage } from "@/lib/page";

export default async function Home() {
  const { lang, dict } = await resolvePage();
  const [certifications, projects, posts] = await Promise.all([
    getCertifications(),
    getProjects(),
    getPosts(),
  ]);
  const stats = dict.stats.map((s) =>
    s.source === "certifications" ? { ...s, value: certifications.length } : s,
  );

  return (
    <PageShell lang={lang} dict={dict}>
      <Hero hero={dict.hero} />
      <Stats stats={stats} />
      <About about={dict.about} />
      <Skills skills={dict.skills} common={dict.common} lang={lang} preview />
      <Work work={dict.work} common={dict.common} lang={lang} projects={projects} preview />
      <Services services={dict.services} common={dict.common} lang={lang} preview />
      <Method method={dict.method} />
      <Certs certs={dict.certs} common={dict.common} lang={lang} items={certifications} preview />
      <Blog blog={dict.blog} common={dict.common} lang={lang} posts={posts} preview />
      <TechMarquee />
      {site.features.testimonials && <Testimonials data={dict.testimonials} />}
      {site.features.offers && <Offers data={dict.offers} />}
      <Contact contact={dict.contact} />
    </PageShell>
  );
}

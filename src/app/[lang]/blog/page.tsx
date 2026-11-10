import Blog from "@/components/Blog";
import PageShell from "@/components/PageShell";
import { getPosts } from "@/lib/content";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata({ params }: PageProps<"/[lang]/blog">) {
  return subpageMetadata(params, "blog", (d) => d.blog);
}

export default async function BlogPage({ params }: PageProps<"/[lang]/blog">) {
  const { lang, dict } = await resolvePage(params);
  const posts = await getPosts(lang);
  return (
    <PageShell lang={lang} dict={dict}>
      <Blog blog={dict.blog} common={dict.common} lang={lang} posts={posts} />
    </PageShell>
  );
}

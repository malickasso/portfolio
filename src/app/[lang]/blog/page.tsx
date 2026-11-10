import Blog from "@/components/Blog";
import PageShell from "@/components/PageShell";
import { getPosts } from "@/lib/content";
import { resolvePage, subpageMetadata } from "@/lib/page";

export function generateMetadata() {
  return subpageMetadata("blog", (d) => d.blog);
}

export default async function BlogPage() {
  const { lang, dict } = await resolvePage();
  const posts = await getPosts();
  return (
    <PageShell lang={lang} dict={dict}>
      <Blog blog={dict.blog} common={dict.common} lang={lang} posts={posts} />
    </PageShell>
  );
}

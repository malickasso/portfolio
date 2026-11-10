import { site } from "@/content/site";

export default function TechMarquee() {
  const items = [...site.tech, ...site.tech];
  return (
    <div className="marquee-wrap overflow-hidden border-y border-line py-8 [mask-image:linear-gradient(90deg,transparent,black_10%,black_90%,transparent)]">
      <div className="marquee flex w-max gap-14">
        {items.map((t, i) => (
          <span key={i} aria-hidden={i >= site.tech.length} className="flex items-center gap-14 font-display text-2xl font-medium text-muted">
            {t}
            <span className="text-accent">✦</span>
          </span>
        ))}
      </div>
    </div>
  );
}

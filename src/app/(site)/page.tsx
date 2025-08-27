import { HeroBlock } from "/src/components/blocks/HeroBlock";
import { fetchHeroBlock } from "/src/lib/contentful";

export default async function HomePage() {
  const heroBlock = await fetchHeroBlock();

  if (!heroBlock) return null;

  return (
    <main>
      <HeroBlock
        headline={heroBlock.headline}
        subtext={heroBlock.subtext}
        ctaText={heroBlock.ctaText}
        ctaLink={heroBlock.ctaLink}
        imageUrl={heroBlock.imageUrl} // ✅ directly typed
      />
    </main>
  );
}

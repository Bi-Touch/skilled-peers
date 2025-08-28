import { HeroBlock as HeroBlockComponent } from "/src/components/blocks/HeroBlock";
import { fetchHeroBlock, type HeroBlockData } from "/src/lib/contentful";

// Enable ISR: revalidate every 60 seconds (configurable)
export const revalidate = 60;

export default async function HomePage() {
  const heroBlock: HeroBlockData | null = await fetchHeroBlock();

  if (!heroBlock) {
    return (
      <main>
        <p className="text-center text-gray-500 py-16">
          No hero section available.
        </p>
      </main>
    );
  }

  return (
    <main>
      <HeroBlockComponent
        headline={heroBlock.headline}
        subtext={heroBlock.subtext}
        ctaText={heroBlock.ctaText || "Get Started"}
        ctaLink={heroBlock.ctaLink || "/contact"}
        imageUrl={heroBlock.imageUrl}
      />
    </main>
  );
}
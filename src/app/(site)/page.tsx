// src/app/(site)/page.tsx
import { HeroBlock } from "/src/components/blocks/HeroBlock";

export default function HomePage() {
  return (
    <main>
      <HeroBlock
        headline="Think. Tinker. Deliver."
        subtext="At Skilled Peers, we help you unlock value with technology and innovation."
        ctaText="Get Started"
        ctaLink="/services"
        imageUrl="/og-default.png" // can be swapped later
      />
    </main>
  );
}
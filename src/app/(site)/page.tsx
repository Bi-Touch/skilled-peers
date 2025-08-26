// src/app/(site)/page.tsx
import { Button } from "/src/components/ui/button";
import { Card } from "/src/components/ui/card";

export default function HomePage() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16 text-center">
      <h1 className="text-4xl font-bold sm:text-6xl">
        Empowering Businesses with Technology
      </h1>
      <p className="mt-6 text-lg text-muted-foreground">
        At SkilledPeers, we help you think, tinker and deliver solutions that
        drive impact.
      </p>
    </section>
  )
}
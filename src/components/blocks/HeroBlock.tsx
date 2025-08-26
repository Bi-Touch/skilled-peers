"use client";

import { Button } from "/src/components/ui/button";
import Image from "next/image";

interface HeroBlockProps {
  headline: string;
  subtext?: string;
  ctaText?: string;
  ctaLink?: string;
  imageUrl?: string;
}

export function HeroBlock({
  headline,
  subtext,
  ctaText = "Get Started",
  ctaLink = "/contact",
  imageUrl,
}: HeroBlockProps) {
  return (
    <section className="relative w-full bg-gray-50 py-16 md:py-24">
      <div className="container mx-auto flex flex-col-reverse items-center px-6 md:flex-row md:px-12">
        {/* Text content */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {headline}
          </h1>
          {subtext && (
            <p className="mt-4 text-lg text-gray-600">{subtext}</p>
          )}
          {ctaText && (
            <div className="mt-6">
              <Button asChild>
                <a href={ctaLink}>{ctaText}</a>
              </Button>
            </div>
          )}
        </div>

        {/* Image content */}
        {imageUrl && (
          <div className="mb-8 flex-1 md:mb-0">
            <Image
              src={imageUrl}
              alt="Hero illustration"
              width={500}
              height={400}
              className="mx-auto rounded-lg shadow-lg"
            />
          </div>
        )}
      </div>
    </section>
  );
}
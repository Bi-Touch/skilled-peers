"use client"

import Link from "next/link"
import { Button } from "/src/components/ui/button"

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        {/* Logo */}
        <Link href="/" className="text-xl font-bold tracking-tight">
          Skilled<span className="text-primary">Peers</span>
        </Link>

        {/* Nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="/services">Services</Link>
          <Link href="/industries">Industries</Link>
          <Link href="/case-studies">Case Studies</Link>
          <Link href="/blog">Blog</Link>
          <Link href="/careers">Careers</Link>
          <Link href="/contact">Contact</Link>
        </nav>

        {/* CTA */}
        <Button asChild>
          <Link href="/contact">Get Started</Link>
        </Button>
      </div>
    </header>
  )
}
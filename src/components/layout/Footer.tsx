import { Input } from "/src/components/ui/input"
import { Button } from "/src/components/ui/button"

export default function Footer() {
  return (
    <footer className="border-t bg-muted/40 py-10 mt-16">
      <div className="mx-auto max-w-6xl px-4 grid gap-8 md:grid-cols-3">
        {/* Brand */}
        <div>
          <h2 className="text-xl font-bold">Skilled Peers</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            Think. Tinker. Deliver.
          </p>
        </div>

        {/* Links */}
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h3 className="font-semibold">Company</h3>
            <ul className="space-y-1">
              <li><a href="/about">About</a></li>
              <li><a href="/careers">Careers</a></li>
              <li><a href="/blog">Blog</a></li>
            </ul>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold">Resources</h3>
            <ul className="space-y-1">
              <li><a href="/services">Services</a></li>
              <li><a href="/industries">Industries</a></li>
              <li><a href="/case-studies">Case Studies</a></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="space-y-2">
          <h3 className="font-semibold">Stay Updated</h3>
          <form className="flex gap-2">
            <Input placeholder="Enter your email" type="email" />
            <Button type="submit">Subscribe</Button>
          </form>
        </div>
      </div>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} Skilled Peers. All rights reserved.
      </div>
    </footer>
  )
}
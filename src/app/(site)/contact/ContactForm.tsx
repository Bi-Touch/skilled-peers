"use client"

import { useState } from "react"
import { toast } from "/src/components/ui/toaster" // updated import
import { Button } from "/src/components/ui/button"
import { Input } from "/src/components/ui/input"
import { Textarea } from "/src/components/ui/textarea"

export default function ContactForm() {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setLoading(true)

    const form = e.currentTarget
    const formData = new FormData(form)

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      })

      if (!res.ok) {
        const err = await res.json()
        throw new Error(err.error || "Failed to send")
      }

      toast("✅ Message Sent: Your message has been delivered successfully!")
      form.reset()
    } catch (err: any) {
      toast(`❌ Failed to Send: ${err.message || "Something went wrong. Try again later."}`)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mt-12 max-w-xl space-y-6">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Name
        </label>
        <Input type="text" name="name" id="name" required />
      </div>

      <div>
        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
          Email
        </label>
        <Input type="email" name="email" id="email" required />
      </div>

      <div>
        <label htmlFor="message" className="block text-sm font-medium text-gray-700">
          Message
        </label>
        <Textarea name="message" id="message" rows={4} required />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Sending..." : "Send Message"}
      </Button>
    </form>
  )
}
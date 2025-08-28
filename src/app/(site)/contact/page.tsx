"use client";

import { useState } from "react";
import { toast } from "@/components/ui/use-toast"; // shadcn/ui toast
import { Button } from "@/components/ui/button"; // shadcn/ui button
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export const revalidate = 60; // ISR: revalidate every 60s

export const metadata = {
  title: "Contact Us | Skilled Peers",
  description: "Get in touch with Skilled Peers. We’re here to help.",
};

export default function ContactPage() {
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    const body = {
      name: formData.get("name"),
      email: formData.get("email"),
      message: formData.get("message"),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to send");
      }

      toast({
        title: "✅ Message Sent",
        description: "Your message has been delivered successfully!",
      });

      form.reset();
    } catch (err: any) {
      toast({
        title: "❌ Failed to Send",
        description: err.message || "Something went wrong. Try again later.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Contact Us
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        We’d love to hear from you! Fill out the form below.
      </p>

      <form
        onSubmit={handleSubmit}
        className="mt-12 max-w-xl space-y-6"
      >
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
    </main>
  );
}
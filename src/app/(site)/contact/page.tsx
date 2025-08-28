import ContactForm from './ContactForm' // client component

export const revalidate = 60; // ISR: revalidate every 60s

export const metadata = {
  title: "Contact Us | Skilled Peers",
  description: "Get in touch with Skilled Peers. We’re here to help.",
};

export default function ContactPage() {
  return (
    <main className="container mx-auto py-16 px-6">
      <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
        Contact Us
      </h1>
      <p className="mt-4 text-lg text-gray-600">
        We’d love to hear from you! Fill out the form below.
      </p>

      <ContactForm />
    </main>
  )
}
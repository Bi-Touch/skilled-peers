import "../styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "SkilledPeers",
  description: "Think. Tinker. Deliver.",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
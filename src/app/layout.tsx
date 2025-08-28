import "../styles/globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import { Toaster } from "../components/ui/toaster"  // ✅ import shadcn toaster

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Skilled Peers",
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
        <Toaster /> {/* ✅ mounts the toast portal globally */}
      </body>
    </html>
  )
}
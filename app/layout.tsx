import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Navigation from "@/components/navigation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Reactly",
  description: "Enhance your emotional intelligence through interactive, story-based social scenarios",
  keywords: "emotional intelligence, EQ training, social skills, empathy, communication",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <body suppressHydrationWarning className={inter.className}>
        <Navigation />
        <main>{children}</main>
      </body>
    </html>
  )
}

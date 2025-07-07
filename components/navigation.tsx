"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Menu, Home, Play, BarChart3, Brain } from "lucide-react"

const navItems = [
  { href: "/", label: "Home", icon: Home },
  { href: "/training", label: "Training", icon: Play },
  { href: "/results", label: "Results", icon: BarChart3 },
]

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600">
            <Brain className="w-8 h-8" />
            <span>Reactly</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = pathname === item.href
              return (
                <Link key={item.href} href={item.href}>
                  <Button variant={isActive ? "default" : "ghost"} className="flex items-center space-x-2">
                    <Icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Button>
                </Link>
              )
            })}
          </div>

          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="sm">
                <Menu className="w-5 h-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-64">
              <div className="flex flex-col space-y-4 mt-8">
                <Link href="/" className="flex items-center space-x-2 font-bold text-xl text-blue-600 mb-4">
                  <Brain className="w-8 h-8" />
                  <span>Reactly</span>
                </Link>
                {navItems.map((item) => {
                  const Icon = item.icon
                  const isActive = pathname === item.href
                  return (
                    <Link key={item.href} href={item.href} onClick={() => setIsOpen(false)}>
                      <Button
                        variant={isActive ? "default" : "ghost"}
                        className="w-full justify-start flex items-center space-x-2"
                      >
                        <Icon className="w-4 h-4" />
                        <span>{item.label}</span>
                      </Button>
                    </Link>
                  )
                })}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </nav>
  )
}

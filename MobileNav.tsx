'use client'

import { Home, Flame, Apple, Smartphone } from 'lucide-react'
import { usePathname } from 'next/navigation'

export default function MobileNav() {
  const pathname = usePathname()

  const navItems = [
    { icon: Home, label: 'Home', href: '/' },
    { icon: Flame, label: 'Explore', href: '/explore' },
    { icon: Apple, label: 'Apple', href: '/apple' },
    { icon: Smartphone, label: 'Mobile', href: '/mobile' },
  ]

  return (
    <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-gray-900 border-t border-gray-800 py-3">
      <div className="flex justify-around items-center">
        {navItems.map((item) => {
          const isActive = pathname === item.href
          return (
            <a
              key={item.label}
              href={item.href}
              className={`flex flex-col items-center ${
                isActive ? 'text-red-500' : 'text-gray-400'
              }`}
            >
              <item.icon className="h-6 w-6" />
              <span className="text-xs mt-1">{item.label}</span>
            </a>
          )
        })}
      </div>
    </nav>
  )
}
'use client'

import { 
  Home, 
  Flame, 
  Music, 
  Gamepad2, 
  Apple, 
  Smartphone, 
  Laptop, 
  Utensils,
  Crown
} from 'lucide-react'

export default function Sidebar() {
  const mainLinks = [
    { icon: Home, label: 'Home', active: true },
    { icon: Flame, label: 'Explore' },
    { icon: Music, label: 'Music' },
    { icon: Gamepad2, label: 'Gaming' },
  ]

  const productLinks = [
    { icon: Apple, label: 'Apple Products' },
    { icon: Smartphone, label: 'Mobile Products' },
    { icon: Laptop, label: 'Digital Product' },
    { icon: Utensils, label: 'Lide Menu' },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-gray-800 p-6">
      {/* YouTube Premium Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">YouTube Premium</h2>
        <div className="space-y-2">
          {mainLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center space-x-4 p-3 sidebar-link ${
                link.active ? 'bg-gray-800' : ''
              }`}
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="mb-8">
        <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-4">
          PRODUCTS
        </h3>
        <div className="space-y-2">
          {productLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className="flex items-center space-x-4 p-3 sidebar-link"
            >
              <link.icon className="h-5 w-5" />
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      {/* Premium Status */}
      <div className="mt-auto pt-8 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center">
            <Crown className="h-5 w-5" />
          </div>
          <div>
            <p className="font-bold">Premium Member</p>
            <p className="text-sm text-gray-400">Active until Dec 2024</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
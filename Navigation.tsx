'use client'

import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const navItems = [
    { name: 'Home', href: '#' },
    { name: 'Digital Product', href: '#' },
    { name: 'Mobile Products', href: '#' },
    { name: 'Apple Products', href: '#' },
    { name: 'Lide Menu', href: '#' },
  ]

  return (
    <nav className="sticky top-0 z-50 bg-[#0f0f0f] border-b border-gray-800">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4 lg:space-x-8">
            <button 
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="text-2xl">☰</span>
            </button>
            
            <div className="flex items-center space-x-2">
              <div className="bg-red-600 p-1 rounded">
                <span className="text-white text-xl">▶️</span>
              </div>
              <span className="text-2xl font-bold" style={{ fontFamily: 'Montserrat' }}>
                MONTELA
              </span>
            </div>

            <div className="hidden lg:flex items-center space-x-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white font-medium transition-colors"
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center bg-gray-900 rounded-full px-4 py-2">
              <span className="text-gray-400 mr-2">🔍</span>
              <input
                type="text"
                placeholder="Search..."
                className="bg-transparent border-none outline-none text-sm w-32"
              />
            </div>
            
            <button className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-full font-medium transition-colors">
              Try Premium
            </button>
            
            <div className="hidden lg:flex items-center bg-gray-800 rounded-full px-4 py-2 cursor-pointer">
              <span className="mr-2">👤</span>
              <span className="text-sm">Account</span>
            </div>
          </div>
        </div>

        {isMenuOpen && (
          <div className="lg:hidden mt-4 pb-4">
            <div className="flex flex-col space-y-3">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-gray-300 hover:text-white font-medium py-2 px-4 bg-gray-900/50 rounded-lg"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
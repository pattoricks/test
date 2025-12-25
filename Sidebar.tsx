'use client'

export default function Sidebar() {
  const mainLinks = [
    { icon: '🏠', label: 'Home', active: true },
    { icon: '🔥', label: 'Explore' },
    { icon: '🎵', label: 'Music' },
    { icon: '🎮', label: 'Gaming' },
  ]

  const productLinks = [
    { icon: '🍎', label: 'Apple Products' },
    { icon: '📱', label: 'Mobile Products' },
    { icon: '💻', label: 'Digital Product' },
    { icon: '🍽️', label: 'Lide Menu' },
  ]

  return (
    <aside className="hidden lg:flex flex-col w-64 min-h-screen border-r border-gray-800 p-6">
      <div className="mb-8">
        <h2 className="text-xl font-bold mb-6">YouTube Premium</h2>
        <div className="space-y-2">
          {mainLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className={`flex items-center space-x-4 p-3 rounded-lg transition-colors hover:bg-white/10 ${
                link.active ? 'bg-gray-800' : ''
              }`}
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mb-8">
        <h3 className="font-bold text-gray-400 text-sm uppercase tracking-wider mb-4">
          PRODUCTS
        </h3>
        <div className="space-y-2">
          {productLinks.map((link) => (
            <a
              key={link.label}
              href="#"
              className="flex items-center space-x-4 p-3 rounded-lg transition-colors hover:bg-white/10"
            >
              <span className="text-xl">{link.icon}</span>
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>

      <div className="mt-auto pt-8 border-t border-gray-800">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-pink-600 rounded-full flex items-center justify-center">
            <span className="text-white">👑</span>
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
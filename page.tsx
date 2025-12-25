import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'

export default function Home() {
  const features = [
    {
      icon: '🛡️',
      title: 'Ad-free & background play',
      description: 'Watch videos uninterrupted by ads, while using other apps, or with the screen locked.'
    },
    {
      icon: '⬇️',
      title: 'Downloads',
      description: 'Save videos for when you really need them – like when you\'re on a plane or commuting.'
    },
    {
      icon: '🎵',
      title: 'YouTube Music Premium',
      description: 'Download and listen to music ad-free, offline, and with your screen locked.'
    }
  ]

  const products = [
    {
      icon: '🍎',
      title: 'Apple Products',
      description: 'Latest Apple devices and accessories for the best YouTube experience.',
      gradientFrom: 'from-gray-800',
      gradientTo: 'to-black'
    },
    {
      icon: '📱',
      title: 'Mobile Products',
      description: 'Mobile devices optimized for streaming YouTube content on the go.',
      gradientFrom: 'from-blue-900/30',
      gradientTo: 'to-black'
    },
    {
      icon: '💻',
      title: 'Digital Product',
      description: 'Software and digital services to enhance your YouTube experience.',
      gradientFrom: 'from-purple-900/30',
      gradientTo: 'to-black'
    },
    {
      icon: '🍽️',
      title: 'Lide Menu',
      description: 'Curated food and dining experiences for YouTube creators and viewers.',
      gradientFrom: 'from-green-900/30',
      gradientTo: 'to-black'
    }
  ]

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-4 md:p-6 lg:p-8 pb-20 lg:pb-6">
        {/* Hero Section */}
        <section className="mb-8 md:mb-12">
          <div className="bg-gradient-to-r from-gray-900 to-black rounded-2xl p-6 md:p-8 lg:p-12">
            <div className="max-w-2xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="bg-red-600 p-2 rounded-lg">
                  <span className="text-white text-2xl">▶️</span>
                </div>
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold">
                  YouTube <span className="text-red-600">Premium</span>
                </h1>
              </div>
              
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                Enjoy ad-free videos, background play, and downloads. Plus, YouTube Music is included.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center">
                  <span className="mr-2">▶</span>
                  Try it free for 1 month
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full font-bold transition-colors">
                  Learn more
                </button>
              </div>
              
              <div className="flex flex-wrap gap-4">
                {[1, 2, 3].map((item) => (
                  <div key={item} className="flex items-center">
                    <span className="text-green-500 mr-2">✅</span>
                    <span className="text-sm">Premium benefit {item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Premium Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div key={index} className="bg-gray-900 rounded-xl p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className="w-14 h-14 bg-red-900/30 rounded-xl flex items-center justify-center mb-4">
                  <span className="text-2xl">{feature.icon}</span>
                </div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product, index) => (
              <div key={index} className="bg-gray-900 rounded-xl overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl">
                <div className={`h-40 bg-gradient-to-r ${product.gradientFrom} ${product.gradientTo} flex items-center justify-center`}>
                  <span className="text-6xl">{product.icon}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{product.title}</h3>
                  <p className="text-gray-400 mb-4">{product.description}</p>
                  <a href="#" className="text-red-400 hover:text-red-300 font-medium inline-flex items-center">
                    Explore →
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
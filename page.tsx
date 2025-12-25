import Sidebar from './components/Sidebar'
import MobileNav from './components/MobileNav'
import ProductCard from './components/ProductCard'
import FeatureCard from './components/FeatureCard'
import { 
  Shield, 
  Download, 
  Music, 
  Apple, 
  Smartphone, 
  Laptop, 
  Utensils,
  Play,
  CheckCircle
} from 'lucide-react'

export default function Home() {
  const features = [
    {
      icon: Shield,
      title: 'Ad-free & background play',
      description: 'Watch videos uninterrupted by ads, while using other apps, or with the screen locked.'
    },
    {
      icon: Download,
      title: 'Downloads',
      description: 'Save videos for when you really need them – like when you\'re on a plane or commuting.'
    },
    {
      icon: Music,
      title: 'YouTube Music Premium',
      description: 'Download and listen to music ad-free, offline, and with your screen locked.'
    }
  ]

  const products = [
    {
      icon: Apple,
      title: 'Apple Products',
      description: 'Latest Apple devices and accessories for the best YouTube experience.',
      gradientFrom: 'bg-gradient-to-r from-gray-800',
      gradientTo: 'to-black'
    },
    {
      icon: Smartphone,
      title: 'Mobile Products',
      description: 'Mobile devices optimized for streaming YouTube content on the go.',
      gradientFrom: 'bg-gradient-to-r from-blue-900/30',
      gradientTo: 'to-black'
    },
    {
      icon: Laptop,
      title: 'Digital Product',
      description: 'Software and digital services to enhance your YouTube experience.',
      gradientFrom: 'bg-gradient-to-r from-purple-900/30',
      gradientTo: 'to-black'
    },
    {
      icon: Utensils,
      title: 'Lide Menu',
      description: 'Curated food and dining experiences for YouTube creators and viewers.',
      gradientFrom: 'bg-gradient-to-r from-green-900/30',
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
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
                YouTube <span className="text-red-500">Premium</span>
              </h1>
              <p className="text-lg md:text-xl text-gray-300 mb-6 md:mb-8">
                Enjoy ad-free videos, background play, and downloads. Plus, YouTube Music is included.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-red-600 hover:bg-red-700 px-6 py-3 rounded-full font-bold transition-colors flex items-center justify-center">
                  <Play className="h-5 w-5 mr-2" fill="white" />
                  Try it free for 1 month
                </button>
                <button className="bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-full font-bold transition-colors">
                  Learn more
                </button>
              </div>
              
              <div className="mt-8 flex flex-wrap gap-4">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Cancel anytime</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Access to YouTube Music</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                  <span className="text-sm">Offline downloads</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Premium Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {features.map((feature) => (
              <FeatureCard key={feature.title} {...feature} />
            ))}
          </div>
        </section>

        {/* Products Section */}
        <section>
          <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product) => (
              <ProductCard key={product.title} {...product} />
            ))}
          </div>
        </section>

        {/* Additional Info */}
        <section className="mt-12 bg-gray-900/50 rounded-2xl p-6 md:p-8">
          <h2 className="text-2xl font-bold mb-4">Why Choose YouTube Premium?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="text-lg font-semibold mb-2">For Creators</h3>
              <p className="text-gray-400">
                Support your favorite creators directly. Premium members contribute more revenue to creators than ad-supported viewers.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">For Viewers</h3>
              <p className="text-gray-400">
                Enjoy YouTube without interruptions, download videos for offline viewing, and listen in the background while using other apps.
              </p>
            </div>
          </div>
        </section>
      </main>

      <MobileNav />
    </div>
  )
}
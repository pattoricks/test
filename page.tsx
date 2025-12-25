// app/page.tsx
import { getPublicProducts } from './lib/productService';
import ProductCard from './components/store/ProductCard';
import Navbar from './components/store/Navbar';
import Footer from './components/store/Footer';

export default async function HomePage() {
  const products = await getPublicProducts();

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 bg-black opacity-10"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Premium Technology <br />
              <span className="text-yellow-300">At Your Fingertips</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Discover the latest Apple products, cutting-edge mobile devices, and digital solutions 
              that enhance your life and work.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="#products" 
                className="bg-white text-blue-600 hover:bg-gray-100 font-semibold py-3 px-8 rounded-full text-lg transition duration-200 transform hover:scale-105"
              >
                Shop Now
              </a>
              <a 
                href="/products" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-blue-600 font-semibold py-3 px-8 rounded-full text-lg transition duration-200"
              >
                View All Products
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section id="products" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">Featured Products</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Curated selection of our most popular and innovative products
            </p>
          </div>

          {products.length === 0 ? (
            <div className="text-center py-12">
              <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
                <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
                </svg>
                <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Available</h3>
                <p className="text-gray-500">Check back soon for our latest products!</p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {products.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {products.length > 8 && (
            <div className="text-center mt-12">
              <a 
                href="/products" 
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-8 rounded-lg text-lg transition duration-200"
              >
                View All Products
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </a>
            </div>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Shop by Category</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: 'Apple Products', icon: '🍎', count: products.filter(p => p.category === 'Apple Products').length, color: 'bg-blue-100' },
              { name: 'Mobile Products', icon: '📱', count: products.filter(p => p.category === 'Mobile Products').length, color: 'bg-green-100' },
              { name: 'Digital Product', icon: '💻', count: products.filter(p => p.category === 'Digital Product').length, color: 'bg-purple-100' },
              { name: 'Home Products', icon: '🏠', count: products.filter(p => p.category === 'Home Products').length, color: 'bg-orange-100' },
            ].map((category) => (
              <a 
                key={category.name}
                href={`/products?category=${category.name}`}
                className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className={`${category.color} w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl`}>
                  {category.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2 text-center">{category.name}</h3>
                <p className="text-gray-600 text-center mb-2">{category.count} products</p>
                <div className="text-center">
                  <span className="inline-flex items-center text-blue-600 font-medium group-hover:underline">
                    Browse
                    <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-gradient-to-r from-blue-50 to-purple-50 py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Why Choose MONTELA?</h2>
            <p className="text-gray-600">Premium products, exceptional service, and guaranteed satisfaction</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-blue-600 text-4xl mb-4">🚚</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Fast Shipping</h3>
              <p className="text-gray-600">Free shipping on orders over $500. Delivery within 2-3 business days.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-green-600 text-4xl mb-4">🛡️</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">2-Year Warranty</h3>
              <p className="text-gray-600">All products come with a comprehensive 2-year manufacturer warranty.</p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-purple-600 text-4xl mb-4">💯</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">Quality Guaranteed</h3>
              <p className="text-gray-600">We only sell authentic products from authorized distributors.</p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
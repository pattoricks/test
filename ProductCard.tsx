// app/components/store/ProductCard.tsx
'use client';

import { Product } from '../../lib/types';
import Link from 'next/link';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Apple Products': return 'bg-blue-100 text-blue-800';
      case 'Mobile Products': return 'bg-green-100 text-green-800';
      case 'Digital Product': return 'bg-purple-100 text-purple-800';
      case 'Home Products': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Apple Products': return '🍎';
      case 'Mobile Products': return '📱';
      case 'Digital Product': return '💻';
      case 'Home Products': return '🏠';
      default: return '📦';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 group border border-gray-100">
      {/* Product Image */}
      <div className="relative h-48 overflow-hidden bg-gray-100">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
              <svg width="400" height="300" viewBox="0 0 400 300" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect width="400" height="300" fill="#F5F5F5"/>
                <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="20" fill="#666">${product.name}</text>
              </svg>
            `)}`;
          }}
        />
        
        {/* Category Badge */}
        <span className={`absolute top-3 left-3 px-3 py-1 rounded-full text-xs font-semibold ${getCategoryColor(product.category)} flex items-center`}>
          <span className="mr-1">{getCategoryIcon(product.category)}</span>
          {product.category}
        </span>
        
        {/* Stock Badge */}
        {product.stock <= 10 && product.stock > 0 && (
          <span className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Low Stock: {product.stock}
          </span>
        )}
        {product.stock === 0 && (
          <span className="absolute top-3 right-3 bg-gray-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            Out of Stock
          </span>
        )}
        
        {/* Sales Badge */}
        {product.sales > 100 && (
          <span className="absolute bottom-3 left-3 bg-yellow-500 text-white px-2 py-1 rounded-full text-xs font-semibold">
            🔥 Best Seller
          </span>
        )}
      </div>
      
      {/* Product Info */}
      <div className="p-5">
        <h3 className="font-bold text-lg text-gray-800 mb-2 truncate">{product.name}</h3>
        <p className="text-gray-600 text-sm mb-4 line-clamp-2 min-h-[40px]">{product.description}</p>
        
        {/* Price and Rating */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <span className="font-bold text-2xl text-gray-900">${product.price.toFixed(2)}</span>
            {product.sales > 0 && (
              <div className="flex items-center mt-1">
                <div className="flex text-yellow-400">
                  {'★'.repeat(5)}
                </div>
                <span className="text-sm text-gray-500 ml-2">({product.sales})</span>
              </div>
            )}
          </div>
          
          <div className="text-right">
            <div className="text-sm text-gray-500">In stock: {product.stock}</div>
            <div className="text-sm text-green-600 font-medium">Free shipping</div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex space-x-3">
          <Link
            href={`/products/${product.id}`}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 text-center"
          >
            View Details
          </Link>
          <button
            disabled={product.stock === 0}
            className={`px-4 py-3 rounded-lg transition duration-200 ${
              product.stock === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-gray-100 hover:bg-gray-200 text-gray-800'
            }`}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
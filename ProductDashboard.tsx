// app/components/ProductDashboard.tsx
import { Product, CategoryStats } from '../lib/types';

interface ProductDashboardProps {
  products: Product[];
}

const ProductDashboard = ({ products }: ProductDashboardProps) => {
  const categories = ['Apple Products', 'Mobile Products', 'Digital Product', 'Home Products'];
  
  const categoryStats: CategoryStats[] = categories.map(category => {
    const categoryProducts = products.filter(p => p.category === category);
    return {
      name: category,
      count: categoryProducts.length,
      revenue: categoryProducts.reduce((sum, p) => sum + (p.price * p.sales), 0)
    };
  });

  const totalProducts = products.length;
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const avgPrice = totalProducts > 0 ? products.reduce((sum, p) => sum + p.price, 0) / totalProducts : 0;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Product Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 rounded-lg border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-blue-600 font-medium">Total Products</p>
              <p className="text-2xl font-bold text-blue-800 mt-1">{totalProducts}</p>
            </div>
            <div className="bg-blue-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-green-100 p-4 rounded-lg border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-green-600 font-medium">Total Revenue</p>
              <p className="text-2xl font-bold text-green-800 mt-1">${totalRevenue.toLocaleString()}</p>
            </div>
            <div className="bg-green-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-purple-100 p-4 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-purple-600 font-medium">Avg. Price</p>
              <p className="text-2xl font-bold text-purple-800 mt-1">${avgPrice.toFixed(2)}</p>
            </div>
            <div className="bg-purple-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z"></path>
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z"></path>
              </svg>
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-orange-100 p-4 rounded-lg border border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-orange-600 font-medium">Categories</p>
              <p className="text-2xl font-bold text-orange-800 mt-1">{categories.length}</p>
            </div>
            <div className="bg-orange-500 p-3 rounded-full">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div>
        <h3 className="font-semibold text-gray-700 mb-3">Category Breakdown</h3>
        <div className="space-y-3">
          {categoryStats.map((cat) => (
            <div key={cat.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div className={`w-3 h-3 rounded-full mr-3 ${
                  cat.name === 'Apple Products' ? 'bg-blue-500' :
                  cat.name === 'Mobile Products' ? 'bg-green-500' :
                  cat.name === 'Digital Product' ? 'bg-purple-500' : 'bg-orange-500'
                }`}></div>
                <span className="text-gray-700">{cat.name}</span>
              </div>
              <div className="text-right">
                <div className="font-medium text-gray-800">{cat.count} products</div>
                <div className="text-sm text-gray-500">${cat.revenue.toLocaleString()} revenue</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDashboard;
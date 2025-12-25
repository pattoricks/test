// app/admin/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import DashboardStats from '../components/admin/DashboardStats';
import SalesChart from '../components/admin/SalesChart';
import ProductTable from '../components/admin/ProductTable';
import { getProducts, getDashboardStats, deleteProduct } from '../lib/productService';
import { Product } from '../lib/types';

export default function AdminDashboard() {
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const [productsData, statsData] = await Promise.all([
        getProducts(),
        getDashboardStats()
      ]);
      setProducts(productsData);
      setStats(statsData);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        // Reload stats after deletion
        const newStats = await getDashboardStats();
        setStats(newStats);
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const handleLogout = () => {
    document.cookie = 'auth-token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/login');
    router.refresh();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800">Admin Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back! Here's what's happening with your store.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <button
            onClick={() => router.push('/admin/products/new')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg shadow-md transition duration-200 flex items-center"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
            </svg>
            Add Product
          </button>
          <button
            onClick={handleLogout}
            className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-2 px-4 rounded-lg transition duration-200"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Stats */}
      {stats && <DashboardStats stats={stats} />}

      {/* Charts */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-6">Sales Analytics</h2>
        <SalesChart products={products} />
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Products</h2>
            <p className="text-gray-600 text-sm">Manage your product inventory</p>
          </div>
          <button
            onClick={() => router.push('/admin/products/new')}
            className="bg-green-600 hover:bg-green-700 text-white font-semibold py-2 px-4 rounded-lg text-sm transition duration-200"
          >
            + Add New
          </button>
        </div>
        <ProductTable 
          products={products} 
          onDelete={handleDeleteProduct}
          onEdit={(id) => router.push(`/admin/products/${id}`)}
        />
      </div>
    </div>
  );
}
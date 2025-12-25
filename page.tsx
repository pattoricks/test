// app/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import ProductDashboard from './components/ProductDashboard';
import ProductForm from './components/ProductForm';
import ProductTable from './components/ProductTable';
import SalesChart from './components/SalesChart';
import { getProducts, createProduct, updateProduct, deleteProduct } from './lib/productService';
import { Product, Alert } from './lib/types';

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [alert, setAlert] = useState<Alert | null>(null);

  useEffect(() => {
    loadProducts();
  }, []);

  const loadProducts = async (): Promise<void> => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.error('Error loading products:', error);
      showAlert('Error loading products', 'error');
    }
  };

  const showAlert = (message: string, type: Alert['type'] = 'success'): void => {
    setAlert({ message, type });
    setTimeout(() => setAlert(null), 3000);
  };

  const handleCreateProduct = async (productData: Omit<Product, 'id'>): Promise<void> => {
    try {
      const newProduct = await createProduct(productData);
      setProducts([...products, newProduct]);
      setIsFormOpen(false);
      showAlert('Product created successfully!');
    } catch (error) {
      console.error('Error creating product:', error);
      showAlert('Error creating product', 'error');
    }
  };

  const handleUpdateProduct = async (productData: Omit<Product, 'id'>): Promise<void> => {
    if (!selectedProduct) return;
    
    try {
      const updatedProduct = await updateProduct(selectedProduct.id, productData);
      setProducts(products.map(p => p.id === selectedProduct.id ? updatedProduct : p));
      setSelectedProduct(null);
      setIsEditing(false);
      setIsFormOpen(false);
      showAlert('Product updated successfully!');
    } catch (error) {
      console.error('Error updating product:', error);
      showAlert('Error updating product', 'error');
    }
  };

  const handleDeleteProduct = async (id: string): Promise<void> => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      try {
        await deleteProduct(id);
        setProducts(products.filter(p => p.id !== id));
        showAlert('Product deleted successfully!');
      } catch (error) {
        console.error('Error deleting product:', error);
        showAlert('Error deleting product', 'error');
      }
    }
  };

  const handleEditProduct = (product: Product): void => {
    setSelectedProduct(product);
    setIsEditing(true);
    setIsFormOpen(true);
  };

  const handleCloseForm = (): void => {
    setIsFormOpen(false);
    setIsEditing(false);
    setSelectedProduct(null);
  };

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      
      <main className="flex-1 p-6 md:p-8 scrollbar-thin overflow-y-auto">
        {alert && (
          <div className={`fade-in mb-6 p-4 rounded-lg ${
            alert.type === 'error' 
              ? 'bg-red-100 text-red-700 border border-red-300' 
              : alert.type === 'warning'
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
              : alert.type === 'info'
              ? 'bg-blue-100 text-blue-700 border border-blue-300'
              : 'bg-green-100 text-green-700 border border-green-300'
          }`}>
            {alert.message}
          </div>
        )}

        <header className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">MONTELA Dashboard</h1>
          <p className="text-gray-600 mt-2">Manage your products and view sales analytics</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <ProductDashboard products={products} />
          </div>

          <div className="lg:col-span-1">
            <button
              onClick={() => setIsFormOpen(true)}
              className="w-full bg-primary-600 hover:bg-primary-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200 flex items-center justify-center"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path>
              </svg>
              Add New Product
            </button>
          </div>
        </div>

        <div className="mt-8">
          <SalesChart products={products} />
        </div>

        <div className="mt-8">
          <ProductTable 
            products={products} 
            onEdit={handleEditProduct} 
            onDelete={handleDeleteProduct} 
          />
        </div>

        {isFormOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <ProductForm 
              onSubmit={isEditing ? handleUpdateProduct : handleCreateProduct}
              onClose={handleCloseForm}
              initialData={selectedProduct}
              isEditing={isEditing}
            />
          </div>
        )}
      </main>
    </div>
  );
}
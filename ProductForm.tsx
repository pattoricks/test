// app/components/ProductForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { SiApple, SiAndroid, SiGooglechrome, SiHomeassistant } from 'react-icons/si';
import { Product, ProductFormData } from '../lib/types';

interface ProductFormProps {
  onSubmit: (productData: Omit<Product, 'id'>) => void;
  onClose: () => void;
  initialData: Product | null;
  isEditing: boolean;
}

interface CategoryOption {
  value: string;
  label: string;
  icon: React.ReactNode;
}

const ProductForm = ({ onSubmit, onClose, initialData, isEditing }: ProductFormProps) => {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Apple Products',
    price: '',
    description: '',
    sales: '',
    image: ''
  });

  const categories: CategoryOption[] = [
    { value: 'Apple Products', label: 'Apple Products', icon: <SiApple className="w-4 h-4" /> },
    { value: 'Mobile Products', label: 'Mobile Products', icon: <SiAndroid className="w-4 h-4" /> },
    { value: 'Digital Product', label: 'Digital Product', icon: <SiGooglechrome className="w-4 h-4" /> },
    { value: 'Home Products', label: 'Home Products', icon: <SiHomeassistant className="w-4 h-4" /> },
  ];

  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        category: initialData.category,
        price: initialData.price.toString(),
        description: initialData.description,
        sales: initialData.sales.toString(),
        image: initialData.image
      });
    }
  }, [initialData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Omit<Product, 'id'> = {
      ...formData,
      price: parseFloat(formData.price),
      sales: parseInt(formData.sales),
      image: formData.image || `https://images.unsplash.com/photo-1580894894513-541e068a3e2b?w=400&h=400&fit=crop&auto=format`
    };
    onSubmit(productData);
  };

  return (
    <div className="bg-white rounded-xl shadow-2xl max-w-md w-full max-h-[90vh] overflow-y-auto scrollbar-thin">
      <div className="p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            {isEditing ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="name">
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter product name"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="category">
              Category
            </label>
            <div className="grid grid-cols-2 gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.value}
                  type="button"
                  onClick={() => setFormData(prev => ({ ...prev, category: cat.value }))}
                  className={`flex items-center justify-center p-3 rounded-lg border ${
                    formData.category === cat.value
                      ? 'bg-blue-100 border-blue-500 text-blue-700'
                      : 'border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  <span className="mr-2">{cat.icon}</span>
                  <span>{cat.label}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="price">
              Price ($)
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                id="price"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                placeholder="0.00"
                step="0.01"
                min="0"
                required
              />
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="sales">
              Sales (Units)
            </label>
            <input
              type="number"
              id="sales"
              name="sales"
              value={formData.sales}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter number of units sold"
              min="0"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="description">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="Enter product description"
              rows={3}
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="image">
              Image URL (Optional)
            </label>
            <input
              type="url"
              id="image"
              name="image"
              value={formData.image}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="https://example.com/image.jpg"
            />
            {formData.image && (
              <div className="mt-2">
                <p className="text-sm text-gray-600 mb-1">Preview:</p>
                <div className="w-20 h-20 border rounded-lg overflow-hidden">
                  <img 
                    src={formData.image} 
                    alt="Preview" 
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODAiIGhlaWdodD0iODAiIHZpZXdCb3g9IjAgMCA4MCA4MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iODAiIGhlaWdodD0iODAiIGZpbGw9IiNFNUU1RTUiLz48cGF0aCBkPSJNNTIgMzZDMzIgMzYgMzYgNTIgMzYgNTJIMzZDNjAgNTIgNTIgMzYgNTIgMzZaIiBmaWxsPSIjQ0VDRUNFIi8+PHBhdGggZD0iTTQwIDQ0QzQ0LjQxODMgNDQgNDggNDAuNDE4MyA0OCAzNkM0OCAzMS41ODE3IDQ0LjQxODMgMjggNDAgMjhDNDAgMjggMjggNDAgMjggNDBDMjggNDAgNDAgNDQgNDAgNDRaIiBmaWxsPSIjQkRCRUJGIi8+PC9zdmc+';
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          <div className="flex space-x-3">
            <button
              type="submit"
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md transition duration-200"
            >
              {isEditing ? 'Update Product' : 'Add Product'}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-semibold py-3 px-4 rounded-lg transition duration-200"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProductForm;
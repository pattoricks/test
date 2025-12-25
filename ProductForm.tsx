// app/components/admin/ProductForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { Product, ProductFormData } from '../../lib/types';

interface ProductFormProps {
  product?: Product;
  onSubmit: (data: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  onCancel: () => void;
  isLoading?: boolean;
}

export default function ProductForm({ product, onSubmit, onCancel, isLoading }: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: '',
    category: 'Apple Products',
    price: '',
    description: '',
    sales: '0',
    image: '',
    stock: '10',
    isPublished: true
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        category: product.category,
        price: product.price.toString(),
        description: product.description,
        sales: product.sales.toString(),
        image: product.image,
        stock: product.stock.toString(),
        isPublished: product.isPublished
      });
    }
  }, [product]);

  const categories = [
    'Apple Products',
    'Mobile Products',
    'Digital Product',
    'Home Products'
  ];

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    
    if (!formData.name.trim()) newErrors.name = 'Product name is required';
    if (!formData.price || parseFloat(formData.price) <= 0) newErrors.price = 'Valid price is required';
    if (!formData.stock || parseInt(formData.stock) < 0) newErrors.stock = 'Valid stock quantity is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'> = {
      name: formData.name.trim(),
      category: formData.category,
      price: parseFloat(formData.price),
      description: formData.description.trim(),
      sales: parseInt(formData.sales) || 0,
      image: formData.image || `https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=400&h=400&fit=crop`,
      stock: parseInt(formData.stock),
      isPublished: formData.isPublished
    };

    await onSubmit(productData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    if (type === 'checkbox') {
      const checkbox = e.target as HTMLInputElement;
      setFormData(prev => ({ ...prev, [name]: checkbox.checked }));
    } else if (type === 'number') {
      // Ensure non-negative numbers
      const numValue = parseFloat(value);
      if (!isNaN(numValue) && numValue >= 0) {
        setFormData(prev => ({ ...prev, [name]: value }));
      } else if (value === '') {
        setFormData(prev => ({ ...prev, [name]: '' }));
      }
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-4xl mx-auto">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          {product ? 'Edit Product' : 'Add New Product'}
        </h2>
        <p className="text-gray-600 mt-1">
          {product ? 'Update product information' : 'Add a new product to your store'}
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.name ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="e.g., iPhone 15 Pro Max"
            />
            {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name}</p>}
          </div>

          {/* Category */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Price and Stock */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Price */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price ($) *
            </label>
            <div className="relative">
              <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                className={`w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                  errors.price ? 'border-red-500' : 'border-gray-300'
                }`}
                placeholder="0.00"
              />
            </div>
            {errors.price && <p className="mt-1 text-sm text-red-600">{errors.price}</p>}
          </div>

          {/* Stock */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Stock Quantity *
            </label>
            <input
              type="number"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
              min="0"
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
                errors.stock ? 'border-red-500' : 'border-gray-300'
              }`}
              placeholder="0"
            />
            {errors.stock && <p className="mt-1 text-sm text-red-600">{errors.stock}</p>}
          </div>

          {/* Sales */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Initial Sales
            </label>
            <input
              type="number"
              name="sales"
              value={formData.sales}
              onChange={handleChange}
              min="0"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
              placeholder="0"
            />
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition ${
              errors.description ? 'border-red-500' : 'border-gray-300'
            }`}
            placeholder="Describe your product in detail..."
          />
          {errors.description && <p className="mt-1 text-sm text-red-600">{errors.description}</p>}
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Image URL
          </label>
          <input
            type="url"
            name="image"
            value={formData.image}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
            placeholder="https://example.com/product-image.jpg"
          />
          {formData.image && (
            <div className="mt-3">
              <p className="text-sm text-gray-600 mb-2">Image Preview:</p>
              <div className="w-32 h-32 border rounded-lg overflow-hidden">
                <img
                  src={formData.image}
                  alt="Preview"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                      <svg width="128" height="128" viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <rect width="128" height="128" fill="#F5F5F5"/>
                        <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="12" fill="#666">No Image</text>
                      </svg>
                    `)}`;
                  }}
                />
              </div>
            </div>
          )}
        </div>

        {/* Published Status */}
        <div className="flex items-center space-x-3">
          <input
            type="checkbox"
            name="isPublished"
            id="isPublished"
            checked={formData.isPublished}
            onChange={handleChange}
            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="isPublished" className="text-sm font-medium text-gray-700">
            Publish product (make visible to customers)
          </label>
        </div>

        {/* Form Actions */}
        <div className="flex justify-end space-x-4 pt-6 border-t border-gray-200">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200 disabled:opacity-50"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                {product ? 'Updating...' : 'Creating...'}
              </>
            ) : (
              product ? 'Update Product' : 'Create Product'
            )}
          </button>
        </div>
      </form>
    </div>
  );
}
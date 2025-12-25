// app/components/admin/ProductTable.tsx
'use client';

import { Product } from '../../lib/types';
import { useState } from 'react';
import { MdEdit, MdDelete, MdVisibility, MdVisibilityOff } from 'react-icons/md';

interface ProductTableProps {
  products: Product[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
  onTogglePublish?: (id: string, currentStatus: boolean) => void;
}

export default function ProductTable({ products, onEdit, onDelete, onTogglePublish }: ProductTableProps) {
  const [sortField, setSortField] = useState<keyof Product>('name');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const handleSort = (field: keyof Product) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const sortedProducts = [...products].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (typeof aValue === 'string' && typeof bValue === 'string') {
      return sortDirection === 'asc' 
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue);
    }
    
    if (typeof aValue === 'number' && typeof bValue === 'number') {
      return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
    }
    
    return 0;
  });

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Apple Products': return 'bg-blue-100 text-blue-800';
      case 'Mobile Products': return 'bg-green-100 text-green-800';
      case 'Digital Product': return 'bg-purple-100 text-purple-800';
      case 'Home Products': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStockColor = (stock: number) => {
    if (stock === 0) return 'bg-red-100 text-red-800';
    if (stock <= 10) return 'bg-yellow-100 text-yellow-800';
    return 'bg-green-100 text-green-800';
  };

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Found</h3>
        <p className="text-gray-500">Add your first product to get started.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg border border-gray-200">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            {[
              { key: 'name' as keyof Product, label: 'Product', width: 'w-1/4' },
              { key: 'category' as keyof Product, label: 'Category', width: 'w-1/6' },
              { key: 'price' as keyof Product, label: 'Price', width: 'w-1/12' },
              { key: 'stock' as keyof Product, label: 'Stock', width: 'w-1/12' },
              { key: 'sales' as keyof Product, label: 'Sales', width: 'w-1/12' },
              { key: 'revenue' as const, label: 'Revenue', width: 'w-1/8' },
              { label: 'Status', width: 'w-1/12' },
              { label: 'Actions', width: 'w-1/6' }
            ].map((column) => (
              <th
                key={column.key || column.label}
                className={`px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider ${column.width} ${
                  'key' in column ? 'cursor-pointer hover:bg-gray-100' : ''
                }`}
                onClick={'key' in column ? () => handleSort(column.key) : undefined}
              >
                <div className="flex items-center">
                  {column.label}
                  {'key' in column && sortField === column.key && (
                    <svg
                      className={`w-4 h-4 ml-1 ${sortDirection === 'desc' ? 'transform rotate-180' : ''}`}
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7" />
                    </svg>
                  )}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedProducts.map((product) => (
            <tr key={product.id} className="hover:bg-gray-50 transition-colors">
              {/* Product Info */}
              <td className="px-6 py-4">
                <div className="flex items-center">
                  <div className="h-10 w-10 flex-shrink-0">
                    <img
                      className="h-10 w-10 rounded-lg object-cover"
                      src={product.image}
                      alt={product.name}
                      onError={(e) => {
                        e.currentTarget.src = `data:image/svg+xml;base64,${btoa(`
                          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <rect width="40" height="40" fill="#F5F5F5"/>
                            <text x="50%" y="50%" text-anchor="middle" dy=".3em" font-family="Arial" font-size="10" fill="#666">${product.name.charAt(0)}</text>
                          </svg>
                        `)}`;
                      }}
                    />
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">{product.name}</div>
                    <div className="text-sm text-gray-500 truncate max-w-xs">{product.description}</div>
                  </div>
                </div>
              </td>

              {/* Category */}
              <td className="px-6 py-4">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getCategoryColor(product.category)}`}>
                  {product.category}
                </span>
              </td>

              {/* Price */}
              <td className="px-6 py-4 text-sm font-medium text-gray-900">
                ${product.price.toFixed(2)}
              </td>

              {/* Stock */}
              <td className="px-6 py-4">
                <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full ${getStockColor(product.stock)}`}>
                  {product.stock} units
                </span>
              </td>

              {/* Sales */}
              <td className="px-6 py-4">
                <div className="text-sm text-gray-900 font-medium">{product.sales}</div>
                <div className="text-xs text-gray-500">units sold</div>
              </td>

              {/* Revenue */}
              <td className="px-6 py-4">
                <div className="text-sm font-bold text-gray-900">
                  ${(product.price * product.sales).toLocaleString()}
                </div>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <div className="flex items-center">
                  {product.isPublished ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800">
                      <MdVisibility className="w-3 h-3 mr-1" />
                      Published
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-800">
                      <MdVisibilityOff className="w-3 h-3 mr-1" />
                      Draft
                    </span>
                  )}
                </div>
              </td>

              {/* Actions */}
              <td className="px-6 py-4 text-sm font-medium">
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => onTogglePublish?.(product.id, product.isPublished)}
                    className={`p-2 rounded-lg transition ${
                      product.isPublished
                        ? 'text-gray-400 hover:text-gray-600 hover:bg-gray-100'
                        : 'text-blue-600 hover:text-blue-800 hover:bg-blue-50'
                    }`}
                    title={product.isPublished ? 'Unpublish' : 'Publish'}
                  >
                    {product.isPublished ? <MdVisibilityOff /> : <MdVisibility />}
                  </button>
                  
                  <button
                    onClick={() => onEdit(product.id)}
                    className="p-2 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded-lg transition"
                    title="Edit"
                  >
                    <MdEdit />
                  </button>
                  
                  <button
                    onClick={() => onDelete(product.id)}
                    className="p-2 text-red-600 hover:text-red-800 hover:bg-red-50 rounded-lg transition"
                    title="Delete"
                  >
                    <MdDelete />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Table Footer */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-semibold">{products.length}</span> products
          </div>
          <div className="text-sm text-gray-700">
            Total Revenue: <span className="font-bold text-green-600">
              ${products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
// app/components/ProductTable.tsx
'use client';

import { SiApple, SiAndroid, SiGooglechrome, SiHomeassistant } from 'react-icons/si';
import { MdEdit, MdDelete } from 'react-icons/md';
import { Product } from '../lib/types';

interface ProductTableProps {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: string) => void;
}

const ProductTable = ({ products, onEdit, onDelete }: ProductTableProps) => {
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Apple Products':
        return <SiApple className="w-5 h-5 text-blue-600" />;
      case 'Mobile Products':
        return <SiAndroid className="w-5 h-5 text-green-600" />;
      case 'Digital Product':
        return <SiGooglechrome className="w-5 h-5 text-purple-600" />;
      case 'Home Products':
        return <SiHomeassistant className="w-5 h-5 text-orange-600" />;
      default:
        return null;
    }
  };

  if (products.length === 0) {
    return (
      <div className="bg-white rounded-xl shadow-lg p-8 text-center">
        <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"></path>
        </svg>
        <h3 className="text-xl font-semibold text-gray-700 mb-2">No Products Yet</h3>
        <p className="text-gray-500 mb-6">Start by adding your first product!</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Product List</h2>
        <p className="text-gray-600 text-sm">Manage all your products in one place</p>
      </div>
      
      <div className="overflow-x-auto scrollbar-thin">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Product
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Category
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Sales
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Revenue
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {products.map((product) => (
              <tr key={product.id} className="hover:bg-gray-50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center mr-3">
                      {product.image ? (
                        <img 
                          src={product.image} 
                          alt={product.name} 
                          className="h-8 w-8 object-cover rounded"
                          onError={(e) => {
                            e.currentTarget.onerror = null;
                            e.currentTarget.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIGZpbGw9IiNFNUU1RTUiLz48cGF0aCBkPSJNMTYgMTJDMjAgMTIgMTggMTggMTggMThIMThDMjYgMTggMjAgMTIgMjAgMTJaIiBmaWxsPSIjQ0VDRUNFIi8+PHBhdGggZD0iTTE2IDE2QzE4LjIwOTEgMTYgMjAgMTQuMjA5MSAyMCAxMkMyMCA5Ljc5MDg2IDE4LjIwOTEgOCAxNiA4QzE2IDggMTIgMTIgMTIgMTJDMTIgMTIgMTYgMTYgMTYgMTZaIiBmaWxsPSIjQkRCRUJGIi8+PC9zdmc+';
                          }}
                        />
                      ) : (
                        getCategoryIcon(product.category)
                      )}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{product.name}</div>
                      <div className="text-gray-500 text-sm truncate max-w-xs">{product.description}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    {getCategoryIcon(product.category)}
                    <span className="ml-2 text-gray-700">{product.category}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                  ${product.price.toFixed(2)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
                    {product.sales} units
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-gray-900 font-medium">
                  ${(product.price * product.sales).toLocaleString()}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button
                      onClick={() => onEdit(product)}
                      className="text-blue-600 hover:text-blue-900 p-1 hover:bg-blue-50 rounded"
                      title="Edit"
                    >
                      <MdEdit className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onDelete(product.id)}
                      className="text-red-600 hover:text-red-900 p-1 hover:bg-red-50 rounded"
                      title="Delete"
                    >
                      <MdDelete className="w-5 h-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="px-6 py-4 border-t border-gray-200 bg-gray-50">
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-700">
            Showing <span className="font-medium">{products.length}</span> products
          </div>
          <div className="text-sm text-gray-700">
            Total Revenue: <span className="font-bold">$
              {products.reduce((sum, p) => sum + (p.price * p.sales), 0).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductTable;
// app/lib/productService.ts
import { Product } from './types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 14 Pro',
    category: 'Apple Products',
    price: 999.99,
    description: 'Latest Apple smartphone with advanced camera system',
    sales: 150,
    image: 'https://images.unsplash.com/photo-1675865485486-1bfb60f5b8bb?w=400&h=400&fit=crop'
  },
  {
    id: '2',
    name: 'MacBook Air M2',
    category: 'Apple Products',
    price: 1199.99,
    description: 'Thin and light laptop with Apple M2 chip',
    sales: 85,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S23',
    category: 'Mobile Products',
    price: 799.99,
    description: 'Android flagship phone with excellent camera',
    sales: 120,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop'
  },
  {
    id: '4',
    name: 'YouTube Premium Subscription',
    category: 'Digital Product',
    price: 11.99,
    description: 'Ad-free YouTube and background playback',
    sales: 450,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop'
  },
  {
    id: '5',
    name: 'Smart Home Hub',
    category: 'Home Products',
    price: 89.99,
    description: 'Central control for all your smart home devices',
    sales: 75,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop'
  },
  {
    id: '6',
    name: 'iPad Air',
    category: 'Apple Products',
    price: 599.99,
    description: 'Powerful tablet for work and entertainment',
    sales: 95,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop'
  }
];

const STORAGE_KEY = 'montela-products';

export const getProducts = async (): Promise<Product[]> => {
  if (typeof window === 'undefined') return initialProducts;
  
  try {
    const storedProducts = localStorage.getItem(STORAGE_KEY);
    if (storedProducts) {
      return JSON.parse(storedProducts);
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(initialProducts));
      return initialProducts;
    }
  } catch (error) {
    console.error('Error getting products:', error);
    return initialProducts;
  }
};

export const createProduct = async (productData: Omit<Product, 'id'>): Promise<Product> => {
  const products = await getProducts();
  const newProduct: Product = {
    ...productData,
    id: Date.now().toString()
  };
  const updatedProducts = [...products, newProduct];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }
  
  return newProduct;
};

export const updateProduct = async (id: string, updatedData: Omit<Product, 'id'>): Promise<Product> => {
  const products = await getProducts();
  const updatedProducts = products.map(product => 
    product.id === id ? { ...product, ...updatedData, id } : product
  );
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }
  
  return { ...updatedData, id };
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const products = await getProducts();
  const updatedProducts = products.filter(product => product.id !== id);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }
  
  return true;
};
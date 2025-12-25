// app/lib/productService.ts
import { Product } from './types';

const initialProducts: Product[] = [
  {
    id: '1',
    name: 'iPhone 15 Pro Max',
    category: 'Apple Products',
    price: 1299.99,
    description: 'Latest Apple smartphone with titanium design and advanced camera',
    sales: 245,
    image: 'https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=400&h=400&fit=crop',
    isPublished: true,
    stock: 50,
    createdAt: '2024-01-15',
    updatedAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'MacBook Air M3',
    category: 'Apple Products',
    price: 1099.99,
    description: 'Ultra-thin laptop with Apple M3 chip and 18-hour battery',
    sales: 189,
    image: 'https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=400&h=400&fit=crop',
    isPublished: true,
    stock: 35,
    createdAt: '2024-01-10',
    updatedAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Samsung Galaxy S24',
    category: 'Mobile Products',
    price: 899.99,
    description: 'AI-powered Android flagship with exceptional performance',
    sales: 320,
    image: 'https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=400&h=400&fit=crop',
    isPublished: true,
    stock: 75,
    createdAt: '2024-01-05',
    updatedAt: '2024-01-05'
  },
  {
    id: '4',
    name: 'YouTube Premium (1 Year)',
    category: 'Digital Product',
    price: 139.99,
    description: 'Ad-free YouTube, background play, and YouTube Music',
    sales: 890,
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=400&fit=crop',
    isPublished: true,
    stock: 999,
    createdAt: '2024-01-01',
    updatedAt: '2024-01-01'
  },
  {
    id: '5',
    name: 'Smart Home Hub Pro',
    category: 'Home Products',
    price: 199.99,
    description: 'Central control for all smart home devices with AI assistant',
    sales: 156,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop',
    isPublished: true,
    stock: 40,
    createdAt: '2023-12-20',
    updatedAt: '2023-12-20'
  },
  {
    id: '6',
    name: 'iPad Pro M2',
    category: 'Apple Products',
    price: 1099.99,
    description: 'Professional tablet with M2 chip and Liquid Retina XDR display',
    sales: 210,
    image: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=400&fit=crop',
    isPublished: true,
    stock: 30,
    createdAt: '2023-12-15',
    updatedAt: '2023-12-15'
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

export const getPublicProducts = async (): Promise<Product[]> => {
  const products = await getProducts();
  return products.filter(product => product.isPublished);
};

export const getProductById = async (id: string): Promise<Product | null> => {
  const products = await getProducts();
  return products.find(product => product.id === id) || null;
};

export const createProduct = async (productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> => {
  const products = await getProducts();
  const newProduct: Product = {
    ...productData,
    id: Date.now().toString(),
    createdAt: new Date().toISOString().split('T')[0],
    updatedAt: new Date().toISOString().split('T')[0]
  };
  const updatedProducts = [...products, newProduct];
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }
  
  return newProduct;
};

export const updateProduct = async (id: string, updatedData: Partial<Product>): Promise<Product> => {
  const products = await getProducts();
  const updatedProducts = products.map(product => 
    product.id === id ? { 
      ...product, 
      ...updatedData, 
      id,
      updatedAt: new Date().toISOString().split('T')[0]
    } : product
  );
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }
  
  return updatedProducts.find(p => p.id === id)!;
};

export const deleteProduct = async (id: string): Promise<boolean> => {
  const products = await getProducts();
  const updatedProducts = products.filter(product => product.id !== id);
  
  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedProducts));
  }
  
  return true;
};

export const getDashboardStats = async () => {
  const products = await getProducts();
  const publicProducts = products.filter(p => p.isPublished);
  
  const totalRevenue = products.reduce((sum, p) => sum + (p.price * p.sales), 0);
  const totalStock = products.reduce((sum, p) => sum + p.stock, 0);
  const totalSales = products.reduce((sum, p) => sum + p.sales, 0);
  
  return {
    totalProducts: products.length,
    publishedProducts: publicProducts.length,
    totalRevenue,
    totalStock,
    totalSales,
    avgPrice: products.length > 0 ? products.reduce((sum, p) => sum + p.price, 0) / products.length : 0
  };
};
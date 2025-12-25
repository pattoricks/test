// app/lib/types.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  sales: number;
  image: string;
  isPublished: boolean; // Tambahan untuk kontrol publikasi
  stock: number; // Tambahan untuk stok
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'customer';
}

export interface Alert {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface CategoryStats {
  name: string;
  count: number;
  revenue: number;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  sales: string;
  image: string;
  stock: string;
  isPublished: boolean;
}
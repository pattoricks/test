// app/lib/types.ts
export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  description: string;
  sales: number;
  image: string;
}

export interface CategoryStats {
  name: string;
  count: number;
  revenue: number;
}

export interface Alert {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
}

export interface MenuItem {
  id: number;
  name: string;
  icon: React.ReactNode;
  active: boolean;
}

export interface ProductFormData {
  name: string;
  category: string;
  price: string;
  description: string;
  sales: string;
  image: string;
}
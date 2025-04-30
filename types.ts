export interface Product {
  id: string;
  name: string;
  category: string;
  subcategory: string;
  price: number;
  discountPrice: number | null;
  description: string;
  features: string[];
  image: string;
  stock: number;
  rating: number;
  reviews: number;
  isNew: boolean;
  isBestseller: boolean;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  subcategories: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Order {
  id: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  paymentMethod: 'instapay' | 'vodafone' | 'cash';
  status: 'pending' | 'processing' | 'shipped' | 'delivered';
  date: string;
  shippingAddress?: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
  };
}

export interface UserAddress {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  isDefault: boolean;
}
export type ProductCategory = 
  | 'All'
  | 'Perfumes'
  | 'Body Lotions'
  | 'Body Mists'
  | 'Deodorants'
  | 'Fragrance Oils';

export type FragranceFamily = 
  | 'All'
  | 'Fresh & Clean'
  | 'Sweet & Floral'
  | 'Woody & Elegant'
  | 'Warm & Sensual'
  | 'Amber & Oriental';

export interface ProductSize {
  size: string;
  priceMultiplier: number;
}

export interface ProductReview {
  id: string;
  author: string;
  rating: number;
  date: string;
  comment: string;
  verified: boolean;
}

export interface Product {
  id: string;
  name: string;
  subtitle: string;
  category: 'Perfumes' | 'Body Lotions' | 'Body Mists' | 'Deodorants' | 'Fragrance Oils';
  price: number; // Base price in GHS
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  image: string;
  additionalImages?: string[];
  description: string;
  fragranceFamily: 'Fresh & Clean' | 'Sweet & Floral' | 'Woody & Elegant' | 'Warm & Sensual' | 'Amber & Oriental';
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  sizes: ProductSize[];
  benefits?: string[]; // Specifically for body lotions & skincare
  keyIngredients?: string[];
  longevity?: string; // e.g. "12-16 Hours"
  sillage?: string; // e.g. "Intimate", "Moderate", "Enchanting Trail"
  concentration?: string; // e.g. "Extrait de Parfum (30%)", "Eau de Parfum", "Nourishing Butter"
  inStock: boolean;
  isFeatured?: boolean;
  isBestSeller?: boolean;
  isNew?: boolean;
  reviews?: ProductReview[];
}

export interface CartItem {
  id: string;
  product: Product;
  selectedSize: string;
  price: number;
  quantity: number;
}

export interface FilterState {
  category: ProductCategory;
  fragranceFamily: FragranceFamily;
  priceRange: [number, number];
  minRating: number;
  sortBy: 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';
  searchQuery: string;
  onlyInStock: boolean;
}

export interface ScentCollection {
  id: string;
  title: string;
  tagline: string;
  family: FragranceFamily;
  image: string;
  description: string;
  accentColor: string;
  mood: string;
}

export interface Testimonial {
  id: string;
  name: string;
  location: string;
  rating: number;
  review: string;
  avatar: string;
  verified: boolean;
  productName: string;
  favoriteNote: string;
}

export interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  region: string;
  deliveryMethod: 'standard' | 'express' | 'same-day';
  paymentMethod: 'momo' | 'card' | 'cod';
  momoNetwork?: 'MTN' | 'Telecel' | 'AT';
  momoNumber?: string;
  orderNotes?: string;
  giftWrapping: boolean;
  giftMessage?: string;
}

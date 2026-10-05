export type Language = 'Marathi' | 'Hindi' | 'Sanskrit' | 'English' | 'Unknown';

export type CategoryId =
  | 'bhagavad-gita'
  | 'vedas'
  | 'upanishads'
  | 'puranas'
  | 'ramayana'
  | 'mahabharata'
  | 'hindu-philosophy'
  | 'vedanta'
  | 'bhakti'
  | 'mantras-stotras'
  | 'puja-rituals'
  | 'sanskrit-literature'
  | 'astrology'
  | 'ayurveda-wellness'
  | 'spirituality'
  | 'childrens-spiritual';

export interface Category {
  id: CategoryId;
  name: string;
  description: string;
  image: string;
}

export interface Book {
  id: string;
  title: string;
  author: string;
  publication: string;
  language: Language;
  price: number;
  originalPrice?: number;
  category: CategoryId;
  coverColor: string;
  coverAccent: string;
  description: string;
  pages: number;
  isbn?: string;
  format: string;
  year?: string;
  featured?: boolean;
  imageUrl?: string;
  onlineStoreUrl?: string;
  availableForSale?: boolean;
  variantId?: string;
}

export interface CartItem {
  bookId: string;
  quantity: number;
}

export interface StoreLocation {
  name: string;
  address: string;
  city: string;
  state: string;
  phone: string;
  whatsapp?: string;
  email?: string;
  hours?: string;
  mapUrl?: string;
}

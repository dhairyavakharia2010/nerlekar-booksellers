import { createContext, useContext, useState, useEffect, useCallback, type ReactNode } from 'react';
import type { CartItem } from '@/types';
import { useProductsContext } from '@/context/ProductsContext';

interface CartContextValue {
  items: CartItem[];
  addItem: (bookId: string, quantity?: number) => void;
  removeItem: (bookId: string) => void;
  updateQuantity: (bookId: string, quantity: number) => void;
  clearCart: () => void;
  count: number;
  subtotal: number;
}

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = 'aanb-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const { products } = useProductsContext();
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((bookId: string, quantity = 1) => {
    setItems(prev => {
      const existing = prev.find(i => i.bookId === bookId);
      if (existing) {
        return prev.map(i => i.bookId === bookId ? { ...i, quantity: i.quantity + quantity } : i);
      }
      return [...prev, { bookId, quantity }];
    });
  }, []);

  const removeItem = useCallback((bookId: string) => {
    setItems(prev => prev.filter(i => i.bookId !== bookId));
  }, []);

  const updateQuantity = useCallback((bookId: string, quantity: number) => {
    if (quantity < 1) {
      setItems(prev => prev.filter(i => i.bookId !== bookId));
      return;
    }
    setItems(prev => prev.map(i => i.bookId === bookId ? { ...i, quantity } : i));
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const count = items.reduce((sum, i) => sum + i.quantity, 0);
  const subtotal = items.reduce((sum, i) => {
    const book = products.find(b => b.id === i.bookId);
    return sum + (book ? book.price * i.quantity : 0);
  }, 0);

  return (
    <CartContext.Provider value={{ items, addItem, removeItem, updateQuantity, clearCart, count, subtotal }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error('useCart must be used within CartProvider');
  return ctx;
}

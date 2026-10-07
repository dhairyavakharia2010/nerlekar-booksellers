import { createContext, useContext, type ReactNode } from 'react';
import type { Book } from '@/types';
import { useProducts, type UseProductsResult } from '@/hooks/useProducts';

interface ProductsContextValue extends UseProductsResult {
  getProductById: (id: string) => Book | undefined;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

export function ProductsProvider({ children }: { children: ReactNode }) {
  const result = useProducts();

  const getProductById = (id: string) => result.products.find(b => b.id === id);

  return (
    <ProductsContext.Provider value={{ ...result, getProductById }}>
      {children}
    </ProductsContext.Provider>
  );
}

export function useProductsContext() {
  const ctx = useContext(ProductsContext);
  if (!ctx) throw new Error('useProductsContext must be used within ProductsProvider');
  return ctx;
}

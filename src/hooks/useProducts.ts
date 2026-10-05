import { useState, useEffect, useCallback } from 'react';
import type { Book } from '@/types';
import { fetchAllProducts, fetchProductByHandle, type ShopifyProductNode } from '@/lib/shopify';
import { mapShopifyProductsToBooks, mapShopifyProductToBook } from '@/lib/shopifyMapper';
import { books as fallbackBooks } from '@/data';

type Source = 'shopify' | 'fallback';

export interface UseProductsResult {
  products: Book[];
  loading: boolean;
  error: string | null;
  source: Source;
  refetch: () => void;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Book[]>(fallbackBooks);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source>('fallback');
  const [refetchFlag, setRefetchFlag] = useState(0);

  const refetch = useCallback(() => setRefetchFlag(f => f + 1), []);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const nodes: ShopifyProductNode[] = await fetchAllProducts();
        if (cancelled) return;

        if (nodes.length === 0) {
          setProducts(fallbackBooks);
          setSource('fallback');
          setError('No products found in Shopify store');
        } else {
          const mapped = mapShopifyProductsToBooks(nodes);
          setProducts(mapped);
          setSource('shopify');
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        setProducts(fallbackBooks);
        setSource('fallback');
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => { cancelled = true; };
  }, [refetchFlag]);

  return { products, loading, error, source, refetch };
}

interface UseProductResult {
  product: Book | null;
  loading: boolean;
  error: string | null;
  source: Source;
}

export function useProduct(handle: string): UseProductResult {
  const [product, setProduct] = useState<Book | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [source, setSource] = useState<Source>('fallback');

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      setError(null);

      try {
        const node: ShopifyProductNode | null = await fetchProductByHandle(handle);
        if (cancelled) return;

        if (!node) {
          const fallback = fallbackBooks.find(b => b.id === handle);
          if (fallback) {
            setProduct(fallback);
            setSource('fallback');
          } else {
            setProduct(null);
            setError('Product not found');
          }
        } else {
          setProduct(mapShopifyProductToBook(node));
          setSource('shopify');
        }
      } catch (err) {
        if (cancelled) return;
        const message = err instanceof Error ? err.message : 'Unknown error';
        setError(message);
        const fallback = fallbackBooks.find(b => b.id === handle);
        if (fallback) {
          setProduct(fallback);
          setSource('fallback');
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();

    return () => { cancelled = true; };
  }, [handle]);

  return { product, loading, error, source };
}

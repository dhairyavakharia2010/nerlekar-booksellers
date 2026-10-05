import { useProductsContext } from '@/context/ProductsContext';

export default function ShopifyDebugBanner() {
  const { products, loading, error, source } = useProductsContext();

  if (loading) {
    return (
      <div className="bg-saffron-500/10 border-b border-saffron-500/20 px-4 py-2 text-center">
        <p className="text-xs text-saffron-700">
          Fetching products from Shopify...
        </p>
      </div>
    );
  }

  if (error && source === 'fallback') {
    return (
      <div className="bg-red-50 border-b border-red-200 px-4 py-2 text-center">
        <p className="text-xs text-red-700">
          Shopify connection failed: {error}. Using fallback data ({products.length} books).
        </p>
      </div>
    );
  }

  if (source === 'shopify') {
    return (
      <div className="bg-green-50 border-b border-green-200 px-4 py-2 text-center">
        <p className="text-xs text-green-700">
          Connected to Shopify · {products.length} products from ashok-anant-nerlekar.myshopify.com
        </p>
      </div>
    );
  }

  return null;
}

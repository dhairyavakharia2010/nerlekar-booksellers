import { useState } from 'react';
import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { useProductsContext } from '@/context/ProductsContext';
import { createShopifyCart } from '@/lib/shopify';
import BookCover from '@/components/BookCover';
import { ArrowRight, Lock, Truck, AlertCircle, Loader2, ExternalLink, ShoppingBag, CheckCircle2 } from 'lucide-react';

export default function CheckoutPage() {
  const { navigate } = useRouter();
  const { items, subtotal } = useCart();
  const { getProductById } = useProductsContext();
  const [redirecting, setRedirecting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [checkoutUrl, setCheckoutUrl] = useState<string | null>(null);
  const [isIframe, setIsIframe] = useState(false);

  if (items.length === 0 && !redirecting) {
    return (
      <div className="container-book py-20 lg:py-32 text-center animate-fade-in">
        <h1 className="font-display text-3xl text-ink-900">Your Cart is Empty</h1>
        <p className="text-ink-600 mt-3">Add books to your cart before checking out.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-8">
          Explore Books
        </button>
      </div>
    );
  }

  const handleCheckout = async () => {
    setError(null);
    setRedirecting(true);

    try {
      const lines = items
        .map(item => {
          const book = getProductById(item.bookId);
          if (!book) return null;
          if (!book.variantId) return null;
          return { merchandiseId: book.variantId, quantity: item.quantity };
        })
        .filter((l): l is { merchandiseId: string; quantity: number } => l !== null);

      if (lines.length === 0) {
        throw new Error('No items in your cart have valid Shopify variant IDs. Please try adding your books again.');
      }

      if (lines.length !== items.length) {
        throw new Error('Some items in your cart could not be matched to Shopify products. Please remove and re-add them.');
      }

      const result = await createShopifyCart(lines);
      setCheckoutUrl(result.checkoutUrl);

      try {
        if (window.self !== window.top) {
          setIsIframe(true);
          return;
        }
        window.location.assign(result.checkoutUrl);
      } catch {
        setIsIframe(true);
        return;
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      setError(
        message.includes('variant ID')
          ? message
          : 'Something went wrong while preparing your checkout. Your cart has been kept intact. Please try again.'
      );
      setRedirecting(false);
    }
  };

  // --- Redirect interstitial ---
  // Shown after cartCreate succeeds but the browser blocks automatic top-level
  // navigation (e.g. inside the Bolt preview iframe). The user clicks the link
  // with target="_top" to open Shopify checkout as the top-level page.
  if (redirecting && checkoutUrl) {
    return (
      <div className="container-book py-16 lg:py-24 animate-fade-in max-w-2xl">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-700/10 flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8 text-green-700" strokeWidth={1.5} />
          </div>
          {isIframe ? (
            <>
              <h1 className="font-display text-3xl text-ink-900 mb-3">Your Cart is Ready</h1>
              <p className="text-ink-600 leading-relaxed mb-8">
                Continue to Shopify's secure checkout to complete your order.
              </p>
              <a
                href={checkoutUrl}
                target="_top"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                <ExternalLink className="w-5 h-5" />
                Continue to Shopify Checkout
              </a>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl text-ink-900 mb-3">Redirecting to Shopify Checkout</h1>
              <p className="text-ink-600 leading-relaxed mb-8">
                You're being redirected to Shopify's secure checkout. If the page doesn't open automatically,
                click the button below.
              </p>
              <a
                href={checkoutUrl}
                target="_top"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                <ExternalLink className="w-5 h-5" />
                Continue to Shopify Checkout
              </a>
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>Redirecting...</span>
              </div>
            </>
          )}
        </div>

        {/* Order summary for reassurance */}
        <div className="mt-10 card-warm p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brown-500/10">
            <ShoppingBag className="w-4 h-4 text-ink-700" strokeWidth={1.5} />
            <h2 className="font-serif text-sm text-ink-900">Your Order</h2>
          </div>
          <div className="space-y-3">
            {items.map(item => {
              const book = getProductById(item.bookId);
              if (!book) return null;
              return (
                <div key={item.bookId} className="flex gap-3">
                  <BookCover book={book} size="sm" />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-serif text-ink-900 leading-tight truncate">{book.title}</p>
                    <p className="text-xs text-ink-500">Qty: {item.quantity}</p>
                    <p className="text-sm text-ink-800 mt-1">₹{book.price * item.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-brown-500/10 flex justify-between items-baseline">
            <span className="text-sm text-ink-600">Total</span>
            <span className="font-serif text-xl text-ink-900">₹{subtotal}</span>
          </div>
        </div>
      </div>
    );
  }

  // --- Main checkout page ---
  return (
    <div className="container-book py-10 lg:py-16 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-10 bg-gold-500" />
        <span className="text-xs tracking-[0.3em] uppercase text-gold-700">Checkout</span>
      </div>
      <h1 className="font-display text-3xl lg:text-4xl text-ink-900 mb-2">Checkout</h1>
      <p className="text-sm text-ink-500 mb-10 flex items-center gap-2">
        <Lock className="w-3.5 h-3.5" />
        You will be redirected to Shopify's secure checkout to complete your purchase
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Order summary + checkout info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-xl text-ink-900 mb-4 pb-2 border-b border-brown-500/10">
              Before You Continue
            </h2>
            <div className="bg-parchment-200/50 border border-brown-500/15 p-5 text-sm text-ink-600 leading-relaxed space-y-2">
              <p>
                When you click "Proceed to Secure Checkout," you will be redirected to Shopify's checkout page.
                Shopify will collect your shipping address, contact details, and payment information securely.
              </p>
              <p>
                Shipping is calculated by Shopify based on your delivery location and DTDC courier rates.
                Pan-India delivery is available.
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-saffron-50 border border-saffron-500/30 p-4">
              <AlertCircle className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-ink-800 font-medium">Checkout could not be started</p>
                <p className="text-sm text-ink-600 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="card-warm p-6 lg:p-8 sticky top-28">
            <h2 className="font-display text-xl text-ink-900 mb-5 pb-4 border-b border-brown-500/10">
              Your Order
            </h2>
            <div className="space-y-4 max-h-64 overflow-y-auto">
              {items.map(item => {
                const book = getProductById(item.bookId);
                if (!book) return null;
                return (
                  <div key={item.bookId} className="flex gap-3">
                    <BookCover book={book} size="sm" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-serif text-ink-900 leading-tight truncate">{book.title}</p>
                      <p className="text-xs text-ink-500">Qty: {item.quantity}</p>
                      <p className="text-sm text-ink-800 mt-1">₹{book.price * item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-brown-500/10 space-y-2 text-sm">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>Shipping</span>
                <span className="text-ink-500">Calculated at checkout</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-brown-500/10 flex justify-between items-baseline">
              <span className="text-sm text-ink-600">Total</span>
              <span className="font-serif text-2xl text-ink-900">₹{subtotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={redirecting}
              className="btn-primary w-full mt-6 flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {redirecting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Preparing Checkout...
                </>
              ) : (
                <>
                  Proceed to Secure Checkout <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="flex items-center gap-2 mt-4 text-xs text-ink-500">
              <Truck className="w-3.5 h-3.5 text-gold-700" strokeWidth={1.5} />
              <span>Pan-India delivery via DTDC · Delivery time per courier</span>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 text-sm text-gold-700 hover:text-gold-600 link-underline w-full text-center"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

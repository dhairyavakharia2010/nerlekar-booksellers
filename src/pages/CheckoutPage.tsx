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
        <h1 className="font-display text-3xl text-ink-900">तुमची कृती रिकामी आहे</h1>
        <p className="text-ink-600 mt-3">चेकआउट करण्यापूर्वी कृतीत पुस्तके जोडा.</p>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-8">
          पुस्तके पहा
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
        throw new Error('तुमच्या कृतीतील कोणत्याही वस्तूला वैध Shopify variant ID नाही. कृपया पुस्तके पुन्हा जोडा.');
      }

      if (lines.length !== items.length) {
        throw new Error('तुमच्या कृतीतील काही वस्तू Shopify उत्पादनांशी जुळवता आल्या नाहीत. कृपया त्या काढून पुन्हा जोडा.');
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
          : 'चेकआउट तयार करताना काहीतरी चूक झाली. तुमची कृती जशीच्यातशी ठेवली आहे. कृपया पुन्हा प्रयत्न करा.'
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
              <h1 className="font-display text-3xl text-ink-900 mb-3">तुमची कृती तयार आहे</h1>
              <p className="text-ink-600 leading-relaxed mb-8">
                तुमची ऑर्डर पूर्ण करण्यासाठी Shopify च्या सुरक्षित चेकआउटवर जा.
              </p>
              <a
                href={checkoutUrl}
                target="_top"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                <ExternalLink className="w-5 h-5" />
                Shopify चेकआउटवर जा
              </a>
            </>
          ) : (
            <>
              <h1 className="font-display text-3xl text-ink-900 mb-3">Shopify चेकआउटवर पाठवत आहे</h1>
              <p className="text-ink-600 leading-relaxed mb-8">
                तुम्हाला Shopify च्या सुरक्षित चेकआउटवर पाठवत आहे. जर पृष्ठ आपोआप उघडले नाही,
                तर खालील बटण क्लिक करा.
              </p>
              <a
                href={checkoutUrl}
                target="_top"
                rel="noopener noreferrer"
                className="btn-primary inline-flex items-center justify-center gap-2 text-base px-8 py-4"
              >
                <ExternalLink className="w-5 h-5" />
                Shopify चेकआउटवर जा
              </a>
              <div className="mt-8 flex items-center justify-center gap-2 text-xs text-ink-500">
                <Loader2 className="w-3.5 h-3.5 animate-spin" />
                <span>पाठवत आहे...</span>
              </div>
            </>
          )}
        </div>

        {/* Order summary for reassurance */}
        <div className="mt-10 card-warm p-6">
          <div className="flex items-center gap-2 mb-4 pb-3 border-b border-brown-500/10">
            <ShoppingBag className="w-4 h-4 text-ink-700" strokeWidth={1.5} />
            <h2 className="font-serif text-sm text-ink-900">तुमची ऑर्डर</h2>
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
                    <p className="text-xs text-ink-500">संख्या: {item.quantity}</p>
                    <p className="text-sm text-ink-800 mt-1">₹{book.price * item.quantity}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="mt-4 pt-3 border-t border-brown-500/10 flex justify-between items-baseline">
            <span className="text-sm text-ink-600">एकूण</span>
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
        <span className="text-xs tracking-[0.3em] uppercase text-gold-700">चेकआउट</span>
      </div>
      <h1 className="font-display text-3xl lg:text-4xl text-ink-900 mb-2">चेकआउट</h1>
      <p className="text-sm text-ink-500 mb-10 flex items-center gap-2">
        <Lock className="w-3.5 h-3.5" />
        तुमची खरेदी पूर्ण करण्यासाठी तुम्हाला Shopify च्या सुरक्षित चेकआउटवर पाठवले जाईल
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Order summary + checkout info */}
        <div className="lg:col-span-2 space-y-8">
          <div>
            <h2 className="font-display text-xl text-ink-900 mb-4 pb-2 border-b border-brown-500/10">
              पुढे जाण्यापूर्वी
            </h2>
            <div className="bg-parchment-200/50 border border-brown-500/15 p-5 text-sm text-ink-600 leading-relaxed space-y-2">
              <p>
                तुम्ही "सुरक्षित चेकआउटवर जा" क्लिक केल्यावर, तुम्हाला Shopify च्या चेकआउट पृष्ठावर पाठवले जाईल.
                Shopify तुमचा वितरण पत्ता, संपर्क माहिती आणि पेमेंट माहिती सुरक्षितपणे गोळा करेल.
              </p>
              <p>
                शिपिंग Shopify द्वारे तुमच्या वितरण स्थळ आणि DTDC कुरियर दरानुसार गणले जाते.
                संपूर्ण भारतात वितरण उपलब्ध आहे.
              </p>
            </div>
          </div>

          {error && (
            <div className="flex items-start gap-3 bg-saffron-50 border border-saffron-500/30 p-4">
              <AlertCircle className="w-5 h-5 text-saffron-600 shrink-0 mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-sm text-ink-800 font-medium">चेकआउट सुरू करता आला नाही</p>
                <p className="text-sm text-ink-600 mt-1">{error}</p>
              </div>
            </div>
          )}
        </div>

        {/* Order summary sidebar */}
        <div className="lg:col-span-1">
          <div className="card-warm p-6 lg:p-8 sticky top-28">
            <h2 className="font-display text-xl text-ink-900 mb-5 pb-4 border-b border-brown-500/10">
              तुमची ऑर्डर
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
                      <p className="text-xs text-ink-500">संख्या: {item.quantity}</p>
                      <p className="text-sm text-ink-800 mt-1">₹{book.price * item.quantity}</p>
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="mt-5 pt-4 border-t border-brown-500/10 space-y-2 text-sm">
              <div className="flex justify-between text-ink-600">
                <span>एकूण</span>
                <span>₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>शिपिंग</span>
                <span className="text-ink-500">चेकआउटवर गणले जाईल</span>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-brown-500/10 flex justify-between items-baseline">
              <span className="text-sm text-ink-600">एकूण</span>
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
                  चेकआउट तयार होत आहे...
                </>
              ) : (
                <>
                  सुरक्षित चेकआउटवर जा <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
            <div className="flex items-center gap-2 mt-4 text-xs text-ink-500">
              <Truck className="w-3.5 h-3.5 text-gold-700" strokeWidth={1.5} />
              <span>संपूर्ण भारतात DTDC द्वारे वितरण · वितरण वेळ कुरियरनुसार</span>
            </div>
            <button
              onClick={() => navigate('/shop')}
              className="mt-4 text-sm text-gold-700 hover:text-gold-600 link-underline w-full text-center"
            >
              खरेदी चालू ठेवा
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

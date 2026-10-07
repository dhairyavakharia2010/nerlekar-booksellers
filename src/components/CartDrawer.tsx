import { useEffect } from 'react';
import { X, Plus, Minus, ShoppingBag, ArrowRight, Trash2 } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { useProductsContext } from '@/context/ProductsContext';
import BookCover from './BookCover';

export default function CartDrawer() {
  const { cartOpen, setCartOpen } = useUI();
  const { navigate } = useRouter();
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const { getProductById } = useProductsContext();

  useEffect(() => {
    if (cartOpen) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = '';
    return () => { document.body.style.overflow = ''; };
  }, [cartOpen]);

  if (!cartOpen) return null;

  const close = () => setCartOpen(false);
  const goToCart = () => { navigate('/cart'); close(); };
  const goToCheckout = () => { navigate('/checkout'); close(); };

  return (
    <>
      <div className="fixed inset-0 bg-ink-900/50 z-50" onClick={close} />
      <div className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-parchment-50 z-50 flex flex-col animate-slide-in shadow-warm-lg">
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brown-500/15">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-ink-800" strokeWidth={1.5} />
            <h2 className="font-serif text-lg text-ink-900">तुमची कृती</h2>
            <span className="text-sm text-ink-500">({items.length})</span>
          </div>
          <button onClick={close} className="text-ink-500 hover:text-ink-800 p-1" aria-label="कृती बंद करा">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {/* Items */}
        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <ShoppingBag className="w-12 h-12 text-brown-400" strokeWidth={1} />
            <p className="font-serif text-lg text-ink-800 mt-4">तुमची कृती रिकामी आहे</p>
            <p className="text-sm text-ink-500 mt-1">आमचे अध्यात्मिक साहित्य पहा</p>
            <button onClick={() => { navigate('/shop'); close(); }} className="btn-primary mt-6">
              पुस्तके पहा
            </button>
          </div>
        ) : (
          <>
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map(item => {
                const book = getProductById(item.bookId);
                if (!book) return null;
                return (
                  <div key={item.bookId} className="flex gap-3 pb-4 border-b border-brown-500/10 last:border-0">
                    <BookCover book={book} size="sm" />
                    <div className="flex-1 min-w-0">
                      <h3 className="font-serif text-sm text-ink-900 leading-tight">{book.title}</h3>
                      <p className="text-xs text-ink-500 mt-0.5">लेखक: {book.author}</p>
                      <p className="text-xs text-ink-500">{book.language} · {book.publication}</p>
                      <div className="flex items-center justify-between mt-2.5">
                        <div className="flex items-center border border-brown-500/20">
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                            className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
                            aria-label="घटक कमी करा"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-3 text-sm text-ink-800">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                            className="p-1.5 text-ink-600 hover:text-ink-900 transition-colors"
                            aria-label="घटक वाढवा"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-serif text-sm text-ink-900">₹{book.price * item.quantity}</span>
                          <button
                            onClick={() => removeItem(item.bookId)}
                            className="text-ink-400 hover:text-saffron-600 transition-colors"
                            aria-label="घटक काढा"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Footer */}
            <div className="border-t border-brown-500/15 px-5 py-4 space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm text-ink-600">एकूण</span>
                <span className="font-serif text-xl text-ink-900">₹{subtotal}</span>
              </div>
              <p className="text-xs text-ink-500">शिपिंग चेकआउटवर गणले जाईल</p>
              <div className="flex flex-col gap-2.5">
                <button onClick={goToCheckout} className="btn-primary w-full">
                  चेकआउट <ArrowRight className="w-4 h-4" />
                </button>
                <button onClick={goToCart} className="btn-secondary w-full">
                  संपूर्ण कृती पहा
                </button>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}

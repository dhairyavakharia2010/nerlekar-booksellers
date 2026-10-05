import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { useProductsContext } from '@/context/ProductsContext';
import BookCover from '@/components/BookCover';
import { Plus, Minus, Trash2, ArrowRight, ShoppingBag, Truck } from 'lucide-react';

export default function CartPage() {
  const { navigate } = useRouter();
  const { items, removeItem, updateQuantity, subtotal } = useCart();
  const { getProductById } = useProductsContext();

  if (items.length === 0) {
    return (
      <div className="container-book py-20 lg:py-32 text-center animate-fade-in">
        <ShoppingBag className="w-16 h-16 text-brown-400 mx-auto" strokeWidth={1} />
        <h1 className="font-display text-3xl text-ink-900 mt-6">Your Cart is Empty</h1>
        <p className="text-ink-600 mt-3 max-w-md mx-auto">
          Explore our collection of religious and spiritual literature to find your next read.
        </p>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-8">
          Explore Books <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    );
  }

  return (
    <div className="container-book py-10 lg:py-16 animate-fade-in">
      <div className="flex items-center gap-3 mb-3">
        <div className="h-px w-10 bg-gold-500" />
        <span className="text-xs tracking-[0.3em] uppercase text-gold-700">Shopping Cart</span>
      </div>
      <h1 className="font-display text-3xl lg:text-4xl text-ink-900 mb-10">Your Cart</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Items */}
        <div className="lg:col-span-2 space-y-5">
          {items.map(item => {
            const book = getProductById(item.bookId);
            if (!book) return null;
            return (
              <div key={item.bookId} className="card-warm p-5 flex gap-5">
                <button onClick={() => navigate(`/product/${book.id}`)}>
                  <BookCover book={book} size="md" />
                </button>
                <div className="flex-1 flex flex-col">
                  <div className="flex-1">
                    <button onClick={() => navigate(`/product/${book.id}`)}>
                      <h3 className="font-serif text-lg text-ink-900 hover:text-gold-700 transition-colors text-left">{book.title}</h3>
                    </button>
                    <p className="text-sm text-ink-600 mt-1">by {book.author}</p>
                    <div className="flex flex-wrap gap-3 mt-2 text-xs text-ink-500">
                      <span>{book.publication}</span>
                      <span className="text-brown-500">·</span>
                      <span>{book.language}</span>
                      <span className="text-brown-500">·</span>
                      <span>{book.format}</span>
                    </div>
                  </div>
                  <div className="flex items-end justify-between mt-4">
                    <div className="flex items-center border border-brown-500/20">
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity - 1)}
                        className="p-2.5 text-ink-600 hover:text-ink-900 transition-colors"
                        aria-label="Decrease quantity"
                      >
                        <Minus className="w-3.5 h-3.5" />
                      </button>
                      <span className="px-4 text-sm text-ink-800">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.bookId, item.quantity + 1)}
                        className="p-2.5 text-ink-600 hover:text-ink-900 transition-colors"
                        aria-label="Increase quantity"
                      >
                        <Plus className="w-3.5 h-3.5" />
                      </button>
                    </div>
                    <div className="flex items-center gap-4">
                      <span className="font-serif text-lg text-ink-900">₹{book.price * item.quantity}</span>
                      <button
                        onClick={() => removeItem(item.bookId)}
                        className="text-ink-400 hover:text-saffron-600 transition-colors p-1"
                        aria-label="Remove item"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Summary */}
        <div className="lg:col-span-1">
          <div className="card-warm p-6 lg:p-8 sticky top-28">
            <h2 className="font-display text-xl text-ink-900 mb-6 pb-4 border-b border-brown-500/10">
              Order Summary
            </h2>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between text-ink-600">
                <span>Subtotal ({items.length} items)</span>
                <span className="text-ink-900 font-medium">₹{subtotal}</span>
              </div>
              <div className="flex justify-between text-ink-600">
                <span>Shipping</span>
                <span className="text-ink-500">Calculated at checkout</span>
              </div>
            </div>
            <div className="mt-6 pt-4 border-t border-brown-500/10 flex justify-between items-baseline">
              <span className="text-sm text-ink-600">Estimated Total</span>
              <span className="font-serif text-2xl text-ink-900">₹{subtotal}</span>
            </div>
            <button onClick={() => navigate('/checkout')} className="btn-primary w-full mt-6">
              Proceed to Checkout <ArrowRight className="w-4 h-4" />
            </button>
            <div className="flex items-center gap-2 mt-4 text-xs text-ink-500">
              <Truck className="w-3.5 h-3.5 text-gold-700" strokeWidth={1.5} />
              <span>Ships across India via DTDC · Delivery time per courier</span>
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

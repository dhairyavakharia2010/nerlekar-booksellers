import type { Book } from '@/types';
import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { showToast } from '@/components/Toast';
import BookCover from './BookCover';
import { Plus, Minus, ArrowRight } from 'lucide-react';

interface BookCardProps {
  book: Book;
  variant?: 'grid' | 'list';
}

export default function BookCard({ book, variant = 'grid' }: BookCardProps) {
  const { navigate } = useRouter();
  const { items, addItem, updateQuantity } = useCart();

  const cartItem = items.find(i => i.bookId === book.id);
  const qty = cartItem?.quantity ?? 0;
  const inCart = qty > 0;

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addItem(book.id);
    showToast('Added to cart');
  };

  const handleIncrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(book.id, qty + 1);
  };

  const handleDecrease = (e: React.MouseEvent) => {
    e.stopPropagation();
    updateQuantity(book.id, qty - 1);
  };

  const goToProduct = () => navigate(`/product/${book.id}`);

  // Shared quantity control component matching existing button styling
  const QuantityControl = ({ compact = false }: { compact?: boolean }) => (
    <div className={`inline-flex items-center bg-ink-800 text-parchment-100 ${compact ? 'text-xs' : 'text-xs'} font-medium tracking-wide`}>
      <button
        onClick={handleDecrease}
        className="px-2.5 py-2.5 hover:bg-ink-900 transition-colors"
        aria-label="Decrease quantity"
      >
        <Minus className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
      <span className="px-2 min-w-[1.75rem] text-center">{qty}</span>
      <button
        onClick={handleIncrease}
        className="px-2.5 py-2.5 hover:bg-ink-900 transition-colors"
        aria-label="Increase quantity"
      >
        <Plus className="w-3.5 h-3.5" strokeWidth={2} />
      </button>
    </div>
  );

  if (variant === 'list') {
    return (
      <div
        onClick={goToProduct}
        className="card-warm flex gap-5 p-5 cursor-pointer group hover:shadow-warm-lg"
      >
        <BookCover book={book} size="md" />
        <div className="flex-1 flex flex-col">
          <div className="flex-1">
            <h3 className="font-serif text-lg text-ink-900 group-hover:text-gold-700 transition-colors">{book.title}</h3>
            <p className="text-sm text-ink-600 mt-1">by {book.author}</p>
            <div className="flex flex-wrap gap-3 mt-2 text-xs text-ink-500">
              <span>{book.publication}</span>
              <span className="text-brown-500">·</span>
              <span>{book.language}</span>
              <span className="text-brown-500">·</span>
              <span>{book.format}</span>
            </div>
            <p className="text-sm text-ink-600 mt-3 line-clamp-2 leading-relaxed">{book.description}</p>
          </div>
          <div className="flex items-center justify-between mt-4">
            <div className="flex items-baseline gap-2">
              <span className="font-serif text-xl text-ink-900">₹{book.price}</span>
              {book.originalPrice && (
                <span className="text-sm text-ink-400 line-through">₹{book.originalPrice}</span>
              )}
            </div>
            {inCart ? (
              <QuantityControl />
            ) : (
              <button
                onClick={handleAdd}
                className="inline-flex items-center gap-1.5 bg-ink-800 text-parchment-100 px-4 py-2.5 text-xs font-medium tracking-wide hover:bg-ink-900 transition-colors"
              >
                <Plus className="w-3.5 h-3.5" strokeWidth={2} />
                Add to Cart
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      onClick={goToProduct}
      className="card-warm p-5 cursor-pointer group flex flex-col"
    >
      <div className="flex justify-center mb-5 pt-2">
        <BookCover book={book} size="lg" />
      </div>
      <div className="flex-1 flex flex-col">
        <h3 className="font-serif text-lg text-ink-900 leading-snug group-hover:text-gold-700 transition-colors line-clamp-2">
          {book.title}
        </h3>
        <p className="text-sm text-ink-600 mt-1">by {book.author}</p>
        <div className="flex flex-wrap gap-2 mt-2 text-xs text-ink-500">
          <span className="border border-brown-500/20 px-2 py-0.5">{book.language}</span>
          <span className="text-ink-400">{book.publication}</span>
        </div>
        <div className="flex items-end justify-between mt-4 pt-4 border-t border-brown-500/10">
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-xl text-ink-900">₹{book.price}</span>
            {book.originalPrice && (
              <span className="text-sm text-ink-400 line-through">₹{book.originalPrice}</span>
            )}
          </div>
          {inCart ? (
            <QuantityControl compact />
          ) : (
            <button
              onClick={handleAdd}
              className="inline-flex items-center gap-1.5 bg-ink-800 text-parchment-100 px-3.5 py-2.5 text-xs font-medium tracking-wide hover:bg-ink-900 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" strokeWidth={2} />
              Add
            </button>
          )}
        </div>
      </div>
      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <span className="text-xs text-gold-700 flex items-center gap-1">
          View Details <ArrowRight className="w-3 h-3" />
        </span>
      </div>
    </div>
  );
}

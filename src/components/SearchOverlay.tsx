import { useState, useEffect, useRef } from 'react';
import { Search, X, ArrowRight } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useUI } from '@/context/UIContext';
import { useProductsContext } from '@/context/ProductsContext';
import { categories } from '@/data';
import type { Book } from '@/types';

export default function SearchOverlay() {
  const { searchOpen, setSearchOpen } = useUI();
  const { navigate } = useRouter();
  const { products, loading } = useProductsContext();
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      setQuery('');
    }
  }, [searchOpen]);

  if (!searchOpen) return null;

  const q = query.toLowerCase().trim();
  const matchedBooks: Book[] = q
    ? products.filter(b =>
        b.title.toLowerCase().includes(q) ||
        b.author.toLowerCase().includes(q) ||
        b.language.toLowerCase().includes(q)
      ).slice(0, 6)
    : [];
  const matchedCategories = q
    ? categories.filter(c => c.name.toLowerCase().includes(q)).slice(0, 4)
    : [];

  const close = () => setSearchOpen(false);
  const goTo = (path: string) => { navigate(path); close(); };

  return (
    <div className="fixed inset-0 z-50 bg-ink-900/60 backdrop-blur-sm" onClick={close}>
      <div
        className="bg-parchment-50 max-w-3xl mx-auto mt-20 mx-4 animate-fade-up"
        onClick={e => e.stopPropagation()}
      >
        <div className="flex items-center gap-3 px-5 py-4 border-b border-brown-500/15">
          <Search className="w-5 h-5 text-ink-500" strokeWidth={1.5} />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={e => setQuery(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter' && q) goTo(`/shop?q=${encodeURIComponent(query)}`); }}
            placeholder="Search by title, author, or language..."
            className="flex-1 bg-transparent text-base text-ink-800 placeholder:text-ink-400 focus:outline-none"
          />
          <button onClick={close} className="text-ink-500 hover:text-ink-800 p-1" aria-label="Close search">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>

        {q && matchedBooks.length === 0 && matchedCategories.length === 0 && (
          <div className="px-5 py-10 text-center">
            <Search className="w-8 h-8 text-brown-400 mx-auto mb-3" strokeWidth={1} />
            <p className="text-sm text-ink-600 font-medium">No books found for "{query}"</p>
            <p className="text-xs text-ink-500 mt-1">Try a different title or browse our categories below</p>
          </div>
        )}

        {(matchedBooks.length > 0 || matchedCategories.length > 0) && (
          <div className="max-h-[60vh] overflow-y-auto">
            {matchedCategories.length > 0 && (
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs tracking-[0.2em] uppercase text-ink-500 mb-2">Categories</p>
                {matchedCategories.map(cat => (
                  <button
                    key={cat.id}
                    onClick={() => goTo(`/shop?category=${cat.id}`)}
                    className="flex items-center justify-between w-full py-2.5 text-left text-sm text-ink-800 hover:text-gold-700 transition-colors group"
                  >
                    <span>{cat.name}</span>
                    <ArrowRight className="w-4 h-4 text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </button>
                ))}
              </div>
            )}
            {matchedBooks.length > 0 && (
              <div className="px-5 pt-4 pb-2">
                <p className="text-xs tracking-[0.2em] uppercase text-ink-500 mb-2">Books</p>
                {matchedBooks.map(book => (
                  <button
                    key={book.id}
                    onClick={() => goTo(`/product/${book.id}`)}
                    className="flex items-center justify-between w-full py-2.5 text-left group"
                  >
                    <div>
                      <p className="text-sm text-ink-800 group-hover:text-gold-700 transition-colors">{book.title}</p>
                      <p className="text-xs text-ink-500">by {book.author} · {book.language}</p>
                    </div>
                    <span className="text-sm font-serif text-ink-700">₹{book.price}</span>
                  </button>
                ))}
              </div>
            )}
            <div className="px-5 py-4 border-t border-brown-500/10">
              <button
                onClick={() => goTo(`/shop?q=${encodeURIComponent(query)}`)}
                className="text-sm text-gold-700 hover:text-gold-600 flex items-center gap-1.5"
              >
                See all results <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {!q && (
          <div className="px-5 py-6">
            {loading ? (
              <div className="flex items-center justify-center py-4">
                <div className="w-6 h-6 border-2 border-brown-500/20 border-t-gold-600 rounded-full animate-spin" />
              </div>
            ) : (
              <>
                <p className="text-xs tracking-[0.2em] uppercase text-ink-500 mb-3">Popular Categories</p>
                <div className="flex flex-wrap gap-2">
                  {categories.slice(0, 8).map(cat => (
                    <button
                      key={cat.id}
                      onClick={() => goTo(`/shop?category=${cat.id}`)}
                      className="text-xs text-ink-700 border border-brown-500/20 px-3 py-1.5 hover:border-gold-600 hover:text-gold-700 transition-colors"
                    >
                      {cat.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

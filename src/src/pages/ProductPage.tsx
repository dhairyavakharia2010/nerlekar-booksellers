import { useState } from 'react';
import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { useProductsContext } from '@/context/ProductsContext';
import { categories } from '@/data';
import BookCover from '@/components/BookCover';
import BookCard from '@/components/BookCard';
import { showToast } from '@/components/Toast';
import { Plus, Minus, ShoppingBag, Zap, Truck, Check, ChevronRight, BookOpen, Loader2 } from 'lucide-react';

export default function ProductPage() {
  const { path, navigate } = useRouter();
  const { addItem } = useCart();
  const { products, getProductById } = useProductsContext();
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'description' | 'details' | 'shipping'>('description');
  const [adding, setAdding] = useState(false);

  const bookId = path.split('/')[2];
  const book = getProductById(bookId);

  if (!book) {
    return (
      <div className="container-book py-20 text-center">
        <h1 className="font-display text-3xl text-ink-900">पुस्तक सापडले नाही</h1>
        <button onClick={() => navigate('/shop')} className="btn-primary mt-6">
          पुस्तकांवर परत जा
        </button>
      </div>
    );
  }

  const category = categories.find(c => c.id === book.category);
  const relatedBooks = products
    .filter(b => b.category === book.category && b.id !== book.id)
    .slice(0, 4);

  const handleAddToCart = () => {
    if (adding) return;
    setAdding(true);
    addItem(book.id, quantity);
    showToast('कृतीत जोडले');
    setTimeout(() => setAdding(false), 600);
  };

  const handleBuyNow = () => {
    addItem(book.id, quantity);
    navigate('/checkout');
  };

  return (
    <div className="animate-fade-in">
      {/* Breadcrumb */}
      <div className="container-book py-4 border-b border-brown-500/10">
        <div className="flex items-center gap-2 text-sm text-ink-500">
          <button onClick={() => navigate('/')} className="hover:text-gold-700 transition-colors">मुख्यपृष्ठ</button>
          <ChevronRight className="w-3 h-3" />
          <button onClick={() => navigate('/shop')} className="hover:text-gold-700 transition-colors">पुस्तके</button>
          <ChevronRight className="w-3 h-3" />
          {category && (
            <>
              <button onClick={() => navigate(`/shop?category=${category.id}`)} className="hover:text-gold-700 transition-colors">
                {category.name}
              </button>
              <ChevronRight className="w-3 h-3" />
            </>
          )}
          <span className="text-ink-800 truncate">{book.title}</span>
        </div>
      </div>

      {/* Product main */}
      <div className="container-book py-10 lg:py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
          {/* Image */}
          <div>
            <div className="flex justify-center bg-parchment-200/40 py-12 lg:py-16 border border-brown-500/10">
              <BookCover book={book} size="xl" className="shadow-warm-lg" />
            </div>
          </div>

          {/* Product info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <span className="text-xs tracking-[0.2em] uppercase text-gold-700 border border-gold-600/30 px-2.5 py-1">
                {book.language}
              </span>
              {book.featured && (
                <span className="text-xs tracking-[0.2em] uppercase text-saffron-600 border border-saffron-500/30 px-2.5 py-1">
                  विशेष
                </span>
              )}
            </div>

            <h1 className="font-display text-3xl lg:text-4xl text-ink-900 leading-tight">{book.title}</h1>
            <p className="mt-2 text-lg text-ink-600">लेखक: {book.author}</p>

            <div className="flex items-center gap-4 mt-4 text-sm text-ink-500">
              <span>{book.publication}</span>
              <span className="text-brown-500">·</span>
              <span>{book.format}</span>
            </div>

            <div className="mt-6 flex items-baseline gap-3">
              <span className="font-serif text-3xl text-ink-900">₹{book.price}</span>
              {book.originalPrice && (
                <>
                  <span className="text-lg text-ink-400 line-through">₹{book.originalPrice}</span>
                  <span className="text-sm text-saffron-600 font-medium">
                    बचत ₹{book.originalPrice - book.price}
                  </span>
                </>
              )}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm text-ink-600">
              <Check className="w-4 h-4 text-green-700" strokeWidth={2} />
              <span>{book.availableForSale === false ? 'सध्या अनुपलब्ध' : 'उपलब्ध'}</span>
            </div>

            {/* Quantity + Add to cart */}
            <div className="mt-8 flex flex-col sm:flex-row gap-4">
              <div className="flex items-center border border-brown-500/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-3.5 text-ink-600 hover:text-ink-900 transition-colors"
                  aria-label="घटक कमी करा"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="px-5 text-base text-ink-800 min-w-[3rem] text-center">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-3.5 text-ink-600 hover:text-ink-900 transition-colors"
                  aria-label="घटक वाढवा"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                disabled={adding}
                className="btn-primary flex-1 disabled:opacity-60 disabled:cursor-not-allowed"
              >
                {adding ? <Loader2 className="w-4 h-4 animate-spin" /> : <ShoppingBag className="w-4 h-4" />}
                {adding ? 'जोडत आहे...' : 'कृतीत जोडा'}
              </button>
            </div>

            <button
              onClick={handleBuyNow}
              className="btn-gold w-full mt-3"
            >
              <Zap className="w-4 h-4" />
              आता खरेदी करा
            </button>

            {/* Quick info */}
            <div className="mt-8 pt-6 border-t border-brown-500/10 space-y-3">
              <div className="flex items-center gap-3 text-sm text-ink-600">
                <Truck className="w-4 h-4 text-gold-700 shrink-0" strokeWidth={1.5} />
                <span>संपूर्ण भारतात DTDC द्वारे वितरण · शिपिंग कुरियर दरानुसार</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-ink-600">
                <BookOpen className="w-4 h-4 text-gold-700 shrink-0" strokeWidth={1.5} />
                <span>{book.format}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="mt-14 lg:mt-20">
          <div className="flex gap-8 border-b border-brown-500/15">
            {([
              { id: 'description', label: 'वर्णन' },
              { id: 'details', label: 'पुस्तकाची माहिती' },
              { id: 'shipping', label: 'शिपिंग माहिती' },
            ] as const).map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`pb-3 text-sm tracking-wide transition-colors relative ${
                  activeTab === tab.id ? 'text-ink-900' : 'text-ink-500 hover:text-ink-700'
                }`}
              >
                {tab.label}
                {activeTab === tab.id && (
                  <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gold-600" />
                )}
              </button>
            ))}
          </div>

          <div className="py-8 max-w-3xl">
            {activeTab === 'description' && (
              <p className="text-ink-700 leading-relaxed text-base">{book.description}</p>
            )}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-12 gap-y-4">
                {[
                  ['शीर्षक', book.title],
                  ['लेखक', book.author || '—'],
                  ['प्रकाशन', book.publication],
                  ['भाषा', book.language],
                  ['स्वरूप', book.format],
                ].map(([label, value]) => (
                  <div key={label} className="flex justify-between border-b border-brown-500/10 pb-2">
                    <span className="text-sm text-ink-500">{label}</span>
                    <span className="text-sm text-ink-800 font-medium">{value}</span>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'shipping' && (
              <div className="space-y-4 text-ink-700 leading-relaxed">
                <p>आम्ही DTDC कुरियर सेवेद्वारे संपूर्ण भारतात शिपिंग करतो.</p>
                <p>शिपिंग शुल्क कुरियर कंपनीनुसार आणि वितरण स्थळानुसार असते. फ्री शिपिंग नाही.</p>
                <p>वितरण वेळ कुरियर कंपनी आणि गंतव्यस्थानावर अवलंबून असतो.</p>
              </div>
            )}
          </div>
        </div>

        {/* Related books */}
        {relatedBooks.length > 0 && (
          <div className="mt-16 lg:mt-20">
            <div className="flex items-center gap-4 mb-8">
              <h2 className="font-display text-2xl lg:text-3xl text-ink-900">संबंधित पुस्तके</h2>
              <div className="flex-1 h-px bg-brown-500/15" />
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
              {relatedBooks.map(b => (
                <BookCard key={b.id} book={b} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { Search, User, ShoppingBag, Menu, X, ChevronRight } from 'lucide-react';
import { useRouter } from '@/context/RouterContext';
import { useCart } from '@/context/CartContext';
import { useUI } from '@/context/UIContext';
import { categories } from '@/data';

export default function Header() {
  const { navigate, path } = useRouter();
  const { count } = useCart();
  const { setCartOpen, setMobileMenuOpen, mobileMenuOpen, setSearchOpen } = useUI();
  const [scrolled, setScrolled] = useState(false);
  const [categoriesOpen, setCategoriesOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { label: 'Shop', path: '/shop' },
    { label: 'About', path: '/about' },
    { label: 'Contact', path: '/contact' },
  ];

  const isActive = (p: string) => path === p || (p === '/shop' && path.startsWith('/product'));

  return (
    <header className={`sticky top-0 z-40 transition-all duration-500 ${scrolled ? 'bg-parchment-100/95 backdrop-blur-md shadow-warm' : 'bg-parchment-100'}`}>
      <div className="border-b border-brown-500/15">
        <div className="container-book">
          {/* Top row */}
          <div className="flex items-center justify-between py-4 lg:py-5">
            {/* Mobile menu button */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-1.5 -ml-1.5 text-ink-800 hover:text-gold-700 transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" strokeWidth={1.5} />
            </button>

            {/* Logo */}
            <button
              onClick={() => navigate('/')}
              className="flex flex-col items-center lg:items-start text-center lg:text-left group"
            >
              <span className="font-display text-lg sm:text-xl lg:text-2xl tracking-[0.15em] text-ink-900 leading-tight">
                ASHOK ANANT
              </span>
              <span className="font-display text-sm sm:text-base lg:text-lg tracking-[0.25em] text-ink-700 leading-tight">
                NERLEKAR BOOKSELLERS
              </span>
              <span className="text-[10px] tracking-[0.3em] text-gold-700 uppercase mt-0.5">
                Pradnyesh Prakashan
              </span>
              <span className="text-[10px] tracking-[0.3em] text-ink-500 uppercase mt-0.5">
                Shri Krupa Enterprises
              </span>
            </button>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-8">
              {navLinks.map(link => (
                <button
                  key={link.path}
                  onClick={() => navigate(link.path)}
                  className={`text-sm tracking-wide link-underline transition-colors ${isActive(link.path) ? 'text-gold-700' : 'text-ink-800 hover:text-gold-700'}`}
                >
                  {link.label}
                </button>
              ))}
              <div
                className="relative"
                onMouseEnter={() => setCategoriesOpen(true)}
                onMouseLeave={() => setCategoriesOpen(false)}
              >
                <button
                  onClick={() => navigate('/shop')}
                  className={`text-sm tracking-wide link-underline transition-colors ${isActive('/shop') ? 'text-gold-700' : 'text-ink-800 hover:text-gold-700'}`}
                >
                  Categories
                </button>
                {categoriesOpen && (
                  <div className="absolute top-full left-1/2 -translate-x-1/2 pt-3">
                    <div className="bg-parchment-50 border border-brown-500/15 shadow-warm-lg p-6 grid grid-cols-3 gap-x-8 gap-y-3 w-[600px]">
                      {categories.map(cat => (
                        <button
                          key={cat.id}
                          onClick={() => navigate(`/shop?category=${cat.id}`)}
                          className="text-left text-sm text-ink-700 hover:text-gold-700 transition-colors flex items-center gap-1.5 group"
                        >
                          <ChevronRight className="w-3 h-3 text-gold-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                          <span>{cat.name}</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </nav>

            {/* Actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSearchOpen(true)}
                className="text-ink-800 hover:text-gold-700 transition-colors p-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => navigate('/account')}
                className="hidden sm:block text-ink-800 hover:text-gold-700 transition-colors p-1"
                aria-label="Account"
              >
                <User className="w-5 h-5" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setCartOpen(true)}
                className="relative text-ink-800 hover:text-gold-700 transition-colors p-1"
                aria-label="Cart"
              >
                <ShoppingBag className="w-5 h-5" strokeWidth={1.5} />
                {count > 0 && (
                  <span className="absolute -top-1.5 -right-1.5 bg-gold-600 text-parchment-100 text-[10px] font-semibold w-4 h-4 rounded-full flex items-center justify-center">
                    {count}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <MobileMenu />
      )}
    </header>
  );
}

function MobileMenu() {
  const { navigate } = useRouter();
  const { setMobileMenuOpen } = useUI();
  const [showCategories, setShowCategories] = useState(false);

  const close = () => setMobileMenuOpen(false);
  const go = (path: string) => { navigate(path); close(); };

  return (
    <>
      <div className="fixed inset-0 bg-ink-900/40 z-50 lg:hidden" onClick={close} />
      <div className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-parchment-50 z-50 lg:hidden overflow-y-auto animate-slide-in shadow-warm-lg">
        <div className="flex items-center justify-between p-5 border-b border-brown-500/15">
          <span className="font-display text-base tracking-[0.15em] text-ink-900">Menu</span>
          <button onClick={close} className="text-ink-800 p-1" aria-label="Close menu">
            <X className="w-5 h-5" strokeWidth={1.5} />
          </button>
        </div>
        <div className="p-5">
          <button onClick={() => go('/shop')} className="block w-full text-left py-3 text-ink-800 text-base border-b border-brown-500/10">
            Shop
          </button>
          <button
            onClick={() => setShowCategories(!showCategories)}
            className="flex items-center justify-between w-full py-3 text-ink-800 text-base border-b border-brown-500/10"
          >
            <span>Categories</span>
            <ChevronRight className={`w-4 h-4 transition-transform ${showCategories ? 'rotate-90' : ''}`} />
          </button>
          {showCategories && (
            <div className="pl-4 pb-2">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => go(`/shop?category=${cat.id}`)}
                  className="block w-full text-left py-2 text-sm text-ink-600 hover:text-gold-700"
                >
                  {cat.name}
                </button>
              ))}
            </div>
          )}
          <button onClick={() => go('/about')} className="block w-full text-left py-3 text-ink-800 text-base border-b border-brown-500/10">
            About
          </button>
          <button onClick={() => go('/contact')} className="block w-full text-left py-3 text-ink-800 text-base border-b border-brown-500/10">
            Contact
          </button>
          <button onClick={() => go('/account')} className="block w-full text-left py-3 text-ink-800 text-base">
            Account
          </button>
        </div>
      </div>
    </>
  );
}

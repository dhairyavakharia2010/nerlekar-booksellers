import { CartProvider } from '@/context/CartContext';
import { RouterProvider, useRouter } from '@/context/RouterContext';
import { UIProvider } from '@/context/UIContext';
import { ProductsProvider } from '@/context/ProductsContext';
import AnnouncementBar from '@/components/AnnouncementBar';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import CartDrawer from '@/components/CartDrawer';
import SearchOverlay from '@/components/SearchOverlay';
import Toast from '@/components/Toast';
import ShopifyDebugBanner from '@/components/ShopifyDebugBanner';
import HomePage from '@/pages/HomePage';
import ShopPage from '@/pages/ShopPage';
import ProductPage from '@/pages/ProductPage';
import CartPage from '@/pages/CartPage';
import CheckoutPage from '@/pages/CheckoutPage';
import AboutPage from '@/pages/AboutPage';
import ContactPage from '@/pages/ContactPage';
import ShippingPage from '@/pages/ShippingPage';
import ReturnsPolicyPage from '@/pages/ReturnsPolicyPage';

function Routes() {
  const { path } = useRouter();

  if (path === '/' || path === '') return <HomePage />;
  if (path === '/shop') return <ShopPage />;
  if (path.startsWith('/product/')) return <ProductPage />;
  if (path === '/cart') return <CartPage />;
  if (path === '/checkout') return <CheckoutPage />;
  if (path === '/about') return <AboutPage />;
  if (path === '/contact') return <ContactPage />;
  if (path === '/shipping') return <ShippingPage />;
  if (path === '/returns') return <ReturnsPolicyPage />;

  return (
    <div className="container-book py-20 lg:py-32 text-center">
      <h1 className="font-display text-4xl text-ink-900">Page Not Found</h1>
      <p className="text-ink-600 mt-3">The page you're looking for doesn't exist.</p>
    </div>
  );
}

function App() {
  return (
    <RouterProvider>
      <ProductsProvider>
        <CartProvider>
          <UIProvider>
          <div className="min-h-screen flex flex-col bg-parchment-100">
            <AnnouncementBar />
            <ShopifyDebugBanner />
            <Header />
            <main className="flex-1">
              <Routes />
            </main>
            <Footer />
            <CartDrawer />
            <SearchOverlay />
            <Toast />
          </div>
        </UIProvider>
      </CartProvider>
      </ProductsProvider>
    </RouterProvider>
  );
}

export default App;

import { useRouter } from '@/context/RouterContext';
import { useProductsContext } from '@/context/ProductsContext';
import { categories, languages, storeLocations } from '@/data';
import CategoryCard from '@/components/CategoryCard';
import BookCard from '@/components/BookCard';
import { ArrowRight, BookOpen, Globe, Truck, ShoppingBag, MapPin, Phone, MessageCircle, Mail } from 'lucide-react';

export default function HomePage() {
  const { navigate } = useRouter();
  const { products } = useProductsContext();
  const featuredBooks = products.filter(b => b.featured).slice(0, 8);

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/3860451/pexels-photo-3860451.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Antique library"
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-ink-900 via-ink-900/80 to-ink-900/40" />
        </div>
        <div className="relative container-book py-20 lg:py-32">
          <div className="max-w-2xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold-500" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">प्रज्ञेश प्रकाशन</span>
            </div>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl text-parchment-100 leading-[1.15] text-balance">
              प्रत्येक पानात<br />
              <span className="text-gold-400">पवित्र ज्ञान</span>
            </h1>
            <p className="mt-6 text-lg text-parchment-300 leading-relaxed max-w-xl">
              मराठी, हिंदी आणि संस्कृत भाषेतील धार्मिक, अध्यात्मिक आणि संस्कृत साहित्याचा काळजीपूर्वक निवडलेला संग्रह — वेदांपासून आधुनिक भाष्यांपर्यंत.
            </p>
            <div className="mt-10 flex flex-col sm:flex-row gap-4">
              <button onClick={() => navigate('/shop')} className="btn-primary bg-gold-600 hover:bg-gold-700">
                पुस्तके पहा <ArrowRight className="w-4 h-4" />
              </button>
              <button onClick={() => navigate('/shop?view=categories')} className="btn-secondary border-parchment-100/30 text-parchment-100 hover:bg-parchment-100 hover:text-ink-900">
                प्रकार पहा
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">विशेष प्रकार</h2>
            <p className="mt-3 text-ink-600 max-w-2xl mx-auto">परंपरा आणि विषयानुसार आमचे पुस्तक पहा</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 lg:gap-5">
            {categories.map(cat => (
              <CategoryCard key={cat.id} category={cat} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Books */}
      <section className="py-16 lg:py-24 bg-parchment-200/50">
        <div className="container-book">
          <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between mb-12 gap-4">
            <div>
              <div className="divider-gold mb-4" />
              <h2 className="font-display text-3xl lg:text-4xl text-ink-900">विशेष पुस्तके</h2>
              <p className="mt-2 text-ink-600">आमच्या पुस्तकांमधून एक निवड</p>
            </div>
            <button onClick={() => navigate('/shop')} className="text-sm text-gold-700 hover:text-gold-600 flex items-center gap-1.5 link-underline">
              सर्व पुस्तके पहा <ArrowRight className="w-4 h-4" />
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 lg:gap-6">
            {featuredBooks.map(book => (
              <BookCard key={book.id} book={book} />
            ))}
          </div>
        </div>
      </section>

      {/* Language Discovery */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">भाषेनुसार पहा</h2>
            <p className="mt-3 text-ink-600">भारतातील पवित्र आणि जिवंत भाषांमधील साहित्य</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {languages.map(lang => (
              <button
                key={lang.name}
                onClick={() => navigate(`/shop?language=${lang.name}`)}
                className="card-warm p-8 lg:p-10 text-center group hover:shadow-warm-lg"
              >
                <div className="font-serif text-4xl text-gold-700 mb-3">{lang.native}</div>
                <h3 className="font-display text-xl text-ink-900 tracking-wide">{lang.name}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{lang.description}</p>
                <div className="mt-5 inline-flex items-center gap-1.5 text-xs text-gold-700 opacity-0 group-hover:opacity-100 transition-opacity">
                  {lang.name} पुस्तके पहा <ArrowRight className="w-3 h-3" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Publication Section */}
      <section className="py-16 lg:py-24 bg-ink-900 text-parchment-100">
        <div className="container-book">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="flex items-center gap-3 mb-6">
                <div className="h-px w-10 bg-gold-500" />
                <span className="text-xs tracking-[0.3em] uppercase text-gold-400">आमचे प्रकाशन</span>
              </div>
              <h2 className="font-display text-3xl lg:text-5xl text-parchment-100 leading-tight">
                प्रज्ञेश प्रकाशन
              </h2>
              <p className="mt-6 text-lg text-parchment-300 leading-relaxed">
                प्रज्ञेश प्रकाशन हे अशोक अनंत नेरळेकर बुकसेलर्सशी संलग्न प्रकाशन गट आहे, जे धार्मिक, अध्यात्मिक आणि तात्त्विक साहित्याचे जतन आणि प्रसार करण्यासाठी समर्पित आहे.
              </p>
              <p className="mt-4 text-parchment-300 leading-relaxed">
                आमची प्रकाशने मराठी, हिंदी आणि संस्कृत भाषेत आहेत — मूळ ग्रंथांपासून शास्त्रीय भाष्यांपर्यंत — संपूर्ण भारतातील वाचक, विद्यार्थी आणि साधकांसाठी उपलब्ध.
              </p>
              <button
                onClick={() => navigate('/shop?publication=Pradnyesh Prakashan')}
                className="mt-8 inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm tracking-wide link-underline"
              >
                प्रज्ञेश प्रकाशनची पुस्तके पहा <ArrowRight className="w-4 h-4" />
              </button>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/35098073/pexels-photo-35098073.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Leather-bound books"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 border border-gold-500/20 m-3 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Store Locations */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">पुण्यातील आमची दुकाने भेट द्या</h2>
            <p className="mt-3 text-ink-600">आम्ही तुम्हाला वैयक्तिकरित्या आमची पुस्तके पहायचे आमंत्रित करतो</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {storeLocations.map(store => (
              <div key={store.name} className="card-warm p-8">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-ink-800 flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5 text-gold-400" strokeWidth={1.5} />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-display text-xl text-ink-900">{store.name}</h3>
                    <p className="text-sm text-ink-600 mt-1">{store.address}</p>
                    <p className="text-sm text-ink-600">{store.city}, {store.state}</p>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center gap-2 text-sm text-ink-700">
                        <Phone className="w-4 h-4 text-gold-700" strokeWidth={1.5} />
                        <a href={`tel:${store.phone}`} className="hover:text-gold-700 transition-colors">{store.phone}</a>
                      </div>
                      {store.whatsapp && (
                        <div className="flex items-center gap-2 text-sm text-ink-700">
                          <MessageCircle className="w-4 h-4 text-gold-700" strokeWidth={1.5} />
                          <a href={`https://wa.me/91${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">WhatsApp</a>
                        </div>
                      )}
                      {store.email && (
                        <div className="flex items-center gap-2 text-sm text-ink-700">
                          <Mail className="w-4 h-4 text-gold-700" strokeWidth={1.5} />
                          <a href={`mailto:${store.email}`} className="hover:text-gold-700 transition-colors">{store.email}</a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Shop With Us */}
      <section className="py-16 lg:py-24 bg-parchment-200/50">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">आमच्याकडे का खरेदी करावी</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: BookOpen, title: 'काळजीपूर्वक निवड', desc: 'धार्मिक आणि अध्यात्मिक साहित्याचा काळजीपूर्वक निवडलेला संग्रह' },
              { icon: Globe, title: 'तीन भाषा', desc: 'मराठी, हिंदी आणि संस्कृत भाषेतील पुस्तके' },
              { icon: Truck, title: 'संपूर्ण भारतात वितरण', desc: 'भारतातील प्रत्येक राज्यात शिपिंग' },
              { icon: ShoppingBag, title: 'ऑनलाइन ऑर्डर', desc: 'घरून सुलभ निवड आणि ऑर्डर करणे' },
            ].map(item => (
              <div key={item.title} className="text-center px-4">
                <div className="w-14 h-14 bg-ink-800 mx-auto flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-ink-900 tracking-wide">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-600 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

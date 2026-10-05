import { useRouter } from '@/context/RouterContext';
import { ArrowRight, BookOpen, Globe, MapPin } from 'lucide-react';

export default function AboutPage() {
  const { navigate } = useRouter();

  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="relative overflow-hidden bg-ink-900 text-parchment-100 py-16 lg:py-24">
        <div className="absolute inset-0">
          <img
            src="https://images.pexels.com/photos/13278839/pexels-photo-13278839.jpeg?auto=compress&cs=tinysrgb&w=1920"
            alt="Library shelves"
            className="w-full h-full object-cover opacity-25"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/80 to-ink-900/60" />
        </div>
        <div className="relative container-book">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold-500" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">About Us</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">
              Ashok Anant Nerlekar Booksellers
            </h1>
            <p className="mt-4 text-lg text-parchment-300">
              A bookstore dedicated to religious, spiritual, and Sanskrit literature.
            </p>
          </div>
        </div>
      </section>

      {/* Main content */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div>
              <div className="divider-gold mb-4" />
              <h2 className="font-display text-3xl text-ink-900 leading-tight">
                Our Bookstore
              </h2>
              <div className="mt-6 space-y-4 text-ink-700 leading-relaxed">
                <p>
                  Ashok Anant Nerlekar Booksellers is a bookstore specialising in religious, spiritual, and Sanskrit literature. Our collection spans the major traditions of Indian thought — from the Vedas and Upanishads to the great epics, from devotional poetry to philosophical treatises.
                </p>
                <p>
                  We serve readers across India, offering books primarily in Marathi, Hindi, and Sanskrit. Whether you are a student of philosophy, a practitioner of rituals, or a seeker of spiritual knowledge, our shelves are curated to support your journey.
                </p>
              </div>
            </div>
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/34592/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1200"
                alt="Leather-bound books on shelf"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-3 border border-gold-500/20 pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Publication */}
      <section className="py-16 lg:py-24 bg-parchment-200/50">
        <div className="container-book">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="order-2 lg:order-1 relative aspect-[4/3] overflow-hidden">
              <img
                src="https://images.pexels.com/photos/8391464/pexels-photo-8391464.jpeg?auto=compress&cs=tinysrgb&w=1200"
                alt="Vintage books"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-3 border border-gold-500/20 pointer-events-none" />
            </div>
            <div className="order-1 lg:order-2">
              <div className="divider-gold mb-4" />
              <h2 className="font-display text-3xl text-ink-900 leading-tight">
                Pradnyesh Prakashan
              </h2>
              <div className="mt-6 space-y-4 text-ink-700 leading-relaxed">
                <p>
                  Pradnyesh Prakashan is the publishing imprint associated with our bookstore. It is dedicated to preserving and disseminating religious, spiritual, and philosophical literature in Marathi, Hindi, and Sanskrit.
                </p>
                <p>
                  Through Pradnyesh Prakashan, we publish foundational scriptures, commentaries, and scholarly works — making the wisdom of Indian traditions accessible to contemporary readers.
                </p>
              </div>
              <button
                onClick={() => navigate('/shop?publication=Pradnyesh Prakashan')}
                className="mt-8 inline-flex items-center gap-2 text-gold-700 hover:text-gold-600 text-sm tracking-wide link-underline"
              >
                Browse Pradnyesh Prakashan titles <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">What We Offer</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { icon: BookOpen, title: 'Curated Literature', desc: 'A carefully selected collection of religious and spiritual books across traditions and languages.' },
              { icon: Globe, title: 'Three Languages', desc: 'Books in Marathi, Hindi, and Sanskrit, serving readers and scholars across India.' },
              { icon: MapPin, title: 'Pune Stores', desc: 'Physical bookstores in Pune where you can browse our collection in person.' },
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

      {/* CTA */}
      <section className="py-16 lg:py-24 bg-ink-900 text-parchment-100">
        <div className="container-book text-center">
          <h2 className="font-display text-3xl lg:text-4xl">Begin Your Reading Journey</h2>
          <p className="mt-3 text-parchment-300 max-w-xl mx-auto">
            Explore our collection of sacred and spiritual literature.
          </p>
          <button onClick={() => navigate('/shop')} className="btn-primary bg-gold-600 hover:bg-gold-700 mt-8">
            Browse Books <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

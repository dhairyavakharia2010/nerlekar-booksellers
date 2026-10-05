import { storeLocations } from '@/data';
import { Phone, MessageCircle, Mail, MapPin, ArrowRight, Send } from 'lucide-react';

const WHATSAPP_NUMBER = '919309526618';
const WHATSAPP_MESSAGE = encodeURIComponent('Hello, I would like to enquire about your books.');
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER}?text=${WHATSAPP_MESSAGE}`;

export default function ContactPage() {
  return (
    <div className="animate-fade-in">
      {/* Hero */}
      <section className="bg-ink-900 text-parchment-100 py-16 lg:py-24">
        <div className="container-book">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold-500" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">Contact</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">Get in Touch</h1>
            <p className="mt-4 text-lg text-parchment-300">
              We're here to help with book enquiries, orders, and more.
            </p>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {[
              { icon: Phone, title: 'Phone', value: '9309526618', href: 'tel:9309526618' },
              { icon: MessageCircle, title: 'WhatsApp', value: '9309526618', href: WHATSAPP_URL },
              { icon: Mail, title: 'Email', value: 'nerlekarbooksellers@gmail.com', href: 'mailto:nerlekarbooksellers@gmail.com' },
            ].map(item => (
              <a
                key={item.title}
                href={item.href}
                target={item.title === 'WhatsApp' ? '_blank' : undefined}
                rel={item.title === 'WhatsApp' ? 'noopener noreferrer' : undefined}
                className="card-warm p-8 text-center hover:shadow-warm-lg transition-shadow"
              >
                <div className="w-14 h-14 bg-ink-800 mx-auto flex items-center justify-center mb-5">
                  <item.icon className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
                </div>
                <h3 className="font-display text-lg text-ink-900 tracking-wide">{item.title}</h3>
                <p className="mt-2 text-sm text-ink-800 font-medium">{item.value}</p>
              </a>
            ))}
          </div>

          {/* WhatsApp CTA */}
          <div className="max-w-2xl mx-auto mb-16">
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-3 bg-ink-800 text-parchment-100 px-6 py-4 hover:bg-ink-900 transition-colors group"
            >
              <MessageCircle className="w-5 h-5 text-gold-400 group-hover:text-gold-300 transition-colors" strokeWidth={1.5} />
              <span className="font-display text-base tracking-wide">Chat with Nerlekar Booksellers on WhatsApp</span>
              <Send className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors" strokeWidth={1.5} />
            </a>
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="divider-gold mx-auto mb-4" />
              <h2 className="font-display text-2xl lg:text-3xl text-ink-900">Send a Message</h2>
              <p className="mt-2 text-sm text-ink-600">We'll respond as soon as possible</p>
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-book">Your Name</label>
                  <input type="text" className="input-book" placeholder="Full name" />
                </div>
                <div>
                  <label className="label-book">Phone</label>
                  <input type="tel" className="input-book" placeholder="+91" />
                </div>
              </div>
              <div>
                <label className="label-book">Email</label>
                <input type="email" className="input-book" placeholder="you@example.com" />
              </div>
              <div>
                <label className="label-book">Subject</label>
                <input type="text" className="input-book" placeholder="How can we help?" />
              </div>
              <div>
                <label className="label-book">Message</label>
                <textarea rows={5} className="input-book resize-none" placeholder="Your message..." />
              </div>
              <button type="submit" className="btn-primary w-full">
                Send Message <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Store locations */}
      <section className="py-16 lg:py-24 bg-parchment-200/50">
        <div className="container-book">
          <div className="text-center mb-12">
            <div className="divider-gold mx-auto mb-4" />
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">Visit Our Stores</h2>
            <p className="mt-3 text-ink-600">We have physical locations in Pune</p>
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
                          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">WhatsApp</a>
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
    </div>
  );
}

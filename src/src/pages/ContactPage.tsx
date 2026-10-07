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
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">संपर्क</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">संपर्क करा</h1>
            <p className="mt-4 text-lg text-parchment-300">
              पुस्तकांच्या चौकशी, ऑर्डर आणि बर्‍याच गोष्टींसाठी आम्ही तुमची मदत करण्यासाठी येथे आहोत.
            </p>
          </div>
        </div>
      </section>

      {/* Contact methods */}
      <section className="py-16 lg:py-24">
        <div className="container-book">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-10">
            {[
              { icon: Phone, title: 'फोन', value: '9309526618', href: 'tel:9309526618' },
              { icon: MessageCircle, title: 'व्हॉट्सअ‍ॅप', value: '9309526618', href: WHATSAPP_URL },
              { icon: Mail, title: 'ईमेल', value: 'nerlekarbooksellers@gmail.com', href: 'mailto:nerlekarbooksellers@gmail.com' },
            ].map(item => (
              <a
                key={item.title}
                href={item.href}
                target={item.title === 'व्हॉट्सअ‍ॅप' ? '_blank' : undefined}
                rel={item.title === 'व्हॉट्सअ‍ॅप' ? 'noopener noreferrer' : undefined}
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
              <span className="font-display text-base tracking-wide">नेरळेकर बुकसेलर्ससह व्हॉट्सअ‍ॅपवर चॅट करा</span>
              <Send className="w-4 h-4 text-gold-400 group-hover:text-gold-300 transition-colors" strokeWidth={1.5} />
            </a>
          </div>

          {/* Contact form */}
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <div className="divider-gold mx-auto mb-4" />
              <h2 className="font-display text-2xl lg:text-3xl text-ink-900">संदेश पाठवा</h2>
              <p className="mt-2 text-sm text-ink-600">आम्ही लवकरात लवकर उत्तर देऊ</p>
            </div>
            <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="label-book">तुमचे नाव</label>
                  <input type="text" className="input-book" placeholder="संपूर्ण नाव" />
                </div>
                <div>
                  <label className="label-book">फोन</label>
                  <input type="tel" className="input-book" placeholder="+91" />
                </div>
              </div>
              <div>
                <label className="label-book">ईमेल</label>
                <input type="email" className="input-book" placeholder="you@example.com" />
              </div>
              <div>
                <label className="label-book">विषय</label>
                <input type="text" className="input-book" placeholder="आम्ही कशी मदत करू शकतो?" />
              </div>
              <div>
                <label className="label-book">संदेश</label>
                <textarea rows={5} className="input-book resize-none" placeholder="तुमचा संदेश..." />
              </div>
              <button type="submit" className="btn-primary w-full">
                संदेश पाठवा <ArrowRight className="w-4 h-4" />
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
            <h2 className="font-display text-3xl lg:text-4xl text-ink-900">आमची दुकाने भेट द्या</h2>
            <p className="mt-3 text-ink-600">पुण्यात आमची वैयक्तिक दुकाने आहेत</p>
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
                          <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="hover:text-gold-700 transition-colors">व्हॉट्सअ‍ॅप</a>
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

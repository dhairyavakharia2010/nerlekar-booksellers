import { useRouter } from '@/context/RouterContext';
import { storeLocations } from '@/data';
import { MapPin, Phone, MessageCircle, Mail } from 'lucide-react';

export default function Footer() {
  const { navigate } = useRouter();

  const shopLinks = [
    { label: 'सर्व पुस्तके', path: '/shop' },
    { label: 'विशेष पुस्तके', path: '/shop?sort=featured' },
    { label: 'मराठी पुस्तके', path: '/shop?language=Marathi' },
    { label: 'हिंदी पुस्तके', path: '/shop?language=Hindi' },
    { label: 'संस्कृत पुस्तके', path: '/shop?language=Sanskrit' },
  ];

  const infoLinks = [
    { label: 'आमच्याबद्दल', path: '/about' },
    { label: 'संपर्क', path: '/contact' },
    { label: 'शिपिंग व वितरण', path: '/shipping' },
    { label: 'परतावा व रद्दीकरण', path: '/returns' },
  ];

  return (
    <footer className="bg-ink-900 text-parchment-200 mt-20">
      <div className="container-book py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-14">
          {/* Brand */}
          <div>
            <div className="mb-4">
              <div className="font-display text-lg tracking-[0.15em] text-parchment-100">ASHOK ANANT</div>
              <div className="font-display text-base tracking-[0.25em] text-parchment-200">NERLEKAR BOOKSELLERS</div>
              <div className="text-[10px] tracking-[0.3em] text-gold-400 uppercase mt-1">Pradnyesh Prakashan</div>
              <div className="text-[10px] tracking-[0.3em] text-parchment-400 uppercase mt-0.5">Shri Krupa Enterprises</div>
            </div>
            <p className="text-sm text-parchment-300 leading-relaxed max-w-xs">
              धार्मिक, अध्यात्मिक आणि संस्कृत साहित्यासाठीचे मराठी, हिंदी आणि संस्कृत भाषेतील पुस्तकांचे दुकान.
            </p>
          </div>

          {/* Shop */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">पुस्तके</h4>
            <ul className="space-y-2.5">
              {shopLinks.map(link => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Information */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">माहिती</h4>
            <ul className="space-y-2.5">
              {infoLinks.map(link => (
                <li key={link.path}>
                  <button
                    onClick={() => navigate(link.path)}
                    className="text-sm text-parchment-300 hover:text-parchment-100 transition-colors"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Store info */}
          <div>
            <h4 className="text-xs tracking-[0.2em] uppercase text-gold-400 mb-4">आमची दुकाने भेट द्या</h4>
            <div className="space-y-4">
              {storeLocations.map(store => (
                <div key={store.name}>
                  <p className="text-sm font-medium text-parchment-200">{store.name}</p>
                  <p className="text-xs text-parchment-300 mt-0.5">{store.address}</p>
                  <p className="text-xs text-parchment-300">{store.city}, {store.state}</p>
                  <div className="flex items-center gap-1.5 mt-1.5 text-xs text-parchment-300">
                    <Phone className="w-3 h-3 text-gold-400" strokeWidth={1.5} />
                    <a href={`tel:${store.phone}`} className="hover:text-parchment-100 transition-colors">{store.phone}</a>
                  </div>
                  {store.whatsapp && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-parchment-300">
                      <MessageCircle className="w-3 h-3 text-gold-400" strokeWidth={1.5} />
                      <a href={`https://wa.me/91${store.whatsapp}`} target="_blank" rel="noopener noreferrer" className="hover:text-parchment-100 transition-colors">WhatsApp</a>
                    </div>
                  )}
                  {store.email && (
                    <div className="flex items-center gap-1.5 mt-1 text-xs text-parchment-300">
                      <Mail className="w-3 h-3 text-gold-400" strokeWidth={1.5} />
                      <a href={`mailto:${store.email}`} className="hover:text-parchment-100 transition-colors">{store.email}</a>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-parchment-100/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-parchment-300">
            © {new Date().getFullYear()} अशोक अनंत नेरळेकर बुकसेलर्स · प्रज्ञेश प्रकाशन · श्री कृपा एंटरप्रायझेस. सर्व हक्क राखीव.
          </p>
          <p className="text-xs text-parchment-400">
            धार्मिक व अध्यात्मिक साहित्य · पुणे, भारत
          </p>
        </div>
      </div>
    </footer>
  );
}

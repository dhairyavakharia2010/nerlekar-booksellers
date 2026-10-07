import { useRouter } from '@/context/RouterContext';
import { Truck, ArrowRight } from 'lucide-react';

export default function ShippingPage() {
  const { navigate } = useRouter();

  return (
    <div className="animate-fade-in">
      <section className="bg-ink-900 text-parchment-100 py-16 lg:py-24">
        <div className="container-book">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-px w-10 bg-gold-500" />
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">माहिती</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">शिपिंग व वितरण</h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-book max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-ink-800 flex items-center justify-center">
              <Truck className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl text-ink-900">वितरण माहिती</h2>
          </div>
          <div className="space-y-4 text-ink-700 leading-relaxed">
            <p>आम्ही सर्व ऑर्डरसाठी संपूर्ण भारतात वितरण करतो.</p>
            <p>ऑर्डर DTDC कुरियर सेवेद्वारे पाठवली जातात.</p>
            <p>शिपिंग शुल्क कुरियर कंपनीनुसार आणि वितरण स्थळानुसार असते. फ्री शिपिंग नाही.</p>
            <p>वितरण वेळ कुरियर कंपनी आणि गंतव्यस्थानावर अवलंबून असतो.</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn-primary mt-10">
            पुस्तके पहा <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

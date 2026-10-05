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
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">Information</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">Shipping & Delivery</h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-book max-w-3xl">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-14 h-14 bg-ink-800 flex items-center justify-center">
              <Truck className="w-6 h-6 text-gold-400" strokeWidth={1.5} />
            </div>
            <h2 className="font-display text-2xl text-ink-900">Delivery Information</h2>
          </div>
          <div className="space-y-4 text-ink-700 leading-relaxed">
            <p>We offer pan-India delivery for all orders.</p>
            <p>Orders are shipped via DTDC courier service.</p>
            <p>Shipping charges are according to the courier company and are based on the delivery location. There is no free shipping.</p>
            <p>Delivery time depends on the courier company and the destination.</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn-primary mt-10">
            Browse Books <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

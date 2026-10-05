import { useRouter } from '@/context/RouterContext';
import { ArrowRight } from 'lucide-react';

export default function ReturnsPolicyPage() {
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
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">Returns, Cancellations & Refunds</h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-book max-w-3xl">
          <div className="space-y-4 text-ink-700 leading-relaxed">
            <p>We do not accept returns.</p>
            <p>We do not offer exchanges.</p>
            <p>Orders cannot be cancelled once placed.</p>
            <p>No refunds are available.</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn-primary mt-10">
            Browse Books <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

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
              <span className="text-xs tracking-[0.3em] uppercase text-gold-400">माहिती</span>
            </div>
            <h1 className="font-display text-4xl lg:text-5xl leading-tight">परतावा, रद्दीकरण आणि पैसे परत करणे</h1>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="container-book max-w-3xl">
          <div className="space-y-4 text-ink-700 leading-relaxed">
            <p>आम्ही परतावा स्वीकारत नाही.</p>
            <p>आम्ही विनिमय देत नाही.</p>
            <p>ऑर्डर दिल्यानंतर रद्द करता येत नाही.</p>
            <p>पैसे परत करण्याची सुविधा नाही.</p>
          </div>
          <button onClick={() => navigate('/shop')} className="btn-primary mt-10">
            पुस्तके पहा <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
}

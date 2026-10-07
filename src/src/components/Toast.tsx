import { useEffect, useState } from 'react';
import { Check, ShoppingBag, X } from 'lucide-react';

export function showToast(message: string) {
  window.dispatchEvent(new CustomEvent('aanb-toast', { detail: { message } }));
}

export default function Toast() {
  const [visible, setVisible] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    function handleToast(e: Event) {
      const detail = (e as CustomEvent).detail;
      if (detail && typeof detail.message === 'string') {
        setMessage(detail.message);
        setVisible(true);
      }
    }
    window.addEventListener('aanb-toast', handleToast as EventListener);
    return () => window.removeEventListener('aanb-toast', handleToast as EventListener);
  }, []);

  useEffect(() => {
    if (!visible) return;
    const timer = setTimeout(() => setVisible(false), 3500);
    return () => clearTimeout(timer);
  }, [visible]);

  if (!visible) return null;

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[60] animate-fade-up max-w-[calc(100vw-2rem)]">
      <div className="flex items-center gap-3 bg-ink-900 text-parchment-100 px-5 py-3.5 shadow-warm-lg">
        <div className="w-7 h-7 bg-green-700/20 flex items-center justify-center shrink-0">
          <Check className="w-4 h-4 text-green-400" strokeWidth={2} />
        </div>
        <span className="text-sm font-medium tracking-wide">{message}</span>
        <a
          href="#/cart"
          onClick={() => setVisible(false)}
          className="inline-flex items-center gap-1.5 text-xs text-gold-400 hover:text-gold-300 transition-colors border-l border-parchment-100/20 pl-3 ml-1 whitespace-nowrap"
        >
          <ShoppingBag className="w-3.5 h-3.5" strokeWidth={1.5} />
          कृती पहा
        </a>
        <button
          onClick={() => setVisible(false)}
          className="text-parchment-300 hover:text-parchment-100 transition-colors ml-1"
          aria-label="बंद करा"
        >
          <X className="w-4 h-4" strokeWidth={1.5} />
        </button>
      </div>
    </div>
  );
}

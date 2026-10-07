import { Truck, BookOpen } from 'lucide-react';

export default function AnnouncementBar() {
  return (
    <div className="bg-ink-900 text-parchment-100 text-xs tracking-wide">
      <div className="container-book flex items-center justify-center gap-8 py-2.5 overflow-hidden">
        <div className="flex items-center gap-2 whitespace-nowrap">
          <Truck className="w-3.5 h-3.5 text-gold-400" strokeWidth={1.5} />
          <span>संपूर्ण भारतात वितरण</span>
        </div>
        <span className="hidden sm:block w-px h-3 bg-parchment-100/20" />
        <div className="flex items-center gap-2 whitespace-nowrap">
          <BookOpen className="w-3.5 h-3.5 text-gold-400" strokeWidth={1.5} />
          <span>ऑनलाइन ऑर्डर उपलब्ध</span>
        </div>
      </div>
    </div>
  );
}

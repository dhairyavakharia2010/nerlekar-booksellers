import type { Category } from '@/types';
import { useRouter } from '@/context/RouterContext';
import { ArrowRight } from 'lucide-react';

export default function CategoryCard({ category }: { category: Category }) {
  const { navigate } = useRouter();

  return (
    <button
      onClick={() => navigate(`/shop?category=${category.id}`)}
      className="relative overflow-hidden group aspect-[4/5] bg-ink-800"
    >
      <img
        src={category.image}
        alt={category.name}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-50 group-hover:scale-105 transition-all duration-700"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-ink-900/40 to-transparent" />
      <div className="absolute inset-0 flex flex-col justify-end p-5 text-left">
        <h3 className="font-serif text-lg text-parchment-100 leading-tight">{category.name}</h3>
        <p className="text-xs text-parchment-300 mt-1 line-clamp-2 leading-relaxed">{category.description}</p>
        <div className="flex items-center gap-1.5 mt-3 text-xs text-gold-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span>Explore</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>
    </button>
  );
}

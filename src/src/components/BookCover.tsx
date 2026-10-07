import type { Book } from '@/types';

interface BookCoverProps {
  book: Book;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

const sizes = {
  sm: 'w-24 h-36',
  md: 'w-32 h-48',
  lg: 'w-40 h-60',
  xl: 'w-56 h-80',
};

const textSizes = {
  sm: 'text-[10px]',
  md: 'text-xs',
  lg: 'text-sm',
  xl: 'text-base',
};

const titleSizes = {
  sm: 'text-xs',
  md: 'text-sm',
  lg: 'text-base',
  xl: 'text-xl',
};

export default function BookCover({ book, size = 'md', className = '' }: BookCoverProps) {
  if (book.imageUrl) {
    return (
      <div
        className={`relative ${sizes[size]} ${className} shrink-0 overflow-hidden shadow-book transition-transform duration-500 group-hover:scale-[1.03]`}
      >
        <img
          src={book.imageUrl}
          alt={book.title}
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
        <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/10 pointer-events-none" />
      </div>
    );
  }

  return (
    <div
      className={`relative ${sizes[size]} ${className} shrink-0 overflow-hidden shadow-book transition-transform duration-500 group-hover:scale-[1.03]`}
      style={{ background: book.coverColor }}
    >
      {/* Spine effect */}
      <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-black/20" />
      {/* Decorative border */}
      <div className="absolute inset-2 border border-opacity-30" style={{ borderColor: book.coverAccent }} />
      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center px-3 text-center">
        <div className={`w-8 h-px mb-2`} style={{ background: book.coverAccent }} />
        <span
          className={`font-serif ${titleSizes[size]} leading-tight font-semibold px-1`}
          style={{ color: book.coverAccent }}
        >
          {book.title}
        </span>
        <div className={`w-8 h-px mt-2 mb-1.5`} style={{ background: book.coverAccent }} />
        <span
          className={`${textSizes[size]} font-sans tracking-wide opacity-80`}
          style={{ color: book.coverAccent }}
        >
          {book.author}
        </span>
      </div>
      {/* Sheen */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-black/20 pointer-events-none" />
    </div>
  );
}

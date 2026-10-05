import { useState, useMemo, useEffect } from 'react';
import { useRouter } from '@/context/RouterContext';
import { useProductsContext } from '@/context/ProductsContext';
import { categories, publications } from '@/data';
import type { Language, CategoryId } from '@/types';
import BookCard from '@/components/BookCard';
import { LayoutGrid, List, SlidersHorizontal, X, ChevronDown, BookOpen, AlertCircle, RefreshCw } from 'lucide-react';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'title-az';

export default function ShopPage() {
  const { params, navigate } = useRouter();
  const { products, loading, error, source, refetch } = useProductsContext();

  const [searchQuery, setSearchQuery] = useState(params.q || '');
  const [selectedCategory, setSelectedCategory] = useState<CategoryId | 'all'>(
    (params.category as CategoryId) || 'all'
  );
  const [selectedLanguage, setSelectedLanguage] = useState<Language | 'all'>(
    (params.language as Language) || 'all'
  );
  const [selectedAuthor, setSelectedAuthor] = useState<string>('all');
  const [selectedPublication, setSelectedPublication] = useState<string>('all');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1500]);
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  useEffect(() => {
    if (params.category) setSelectedCategory(params.category as CategoryId);
    if (params.language) setSelectedLanguage(params.language as Language);
    if (params.publication) setSelectedPublication(params.publication);
    if (params.q) setSearchQuery(params.q);
    if (params.sort === 'featured') setSortBy('featured');
  }, [params]);

  const authors = useMemo(() => {
    const set = new Set(products.map(b => b.author));
    return Array.from(set).sort();
  }, [products]);

  const filteredBooks = useMemo(() => {
    let result = products.filter(b => {
      if (selectedCategory !== 'all' && b.category !== selectedCategory) return false;
      if (selectedLanguage !== 'all' && b.language !== selectedLanguage) return false;
      if (selectedAuthor !== 'all' && b.author !== selectedAuthor) return false;
      if (selectedPublication !== 'all' && b.publication !== selectedPublication) return false;
      if (b.price < priceRange[0] || b.price > priceRange[1]) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        if (!b.title.toLowerCase().includes(q) && !b.author.toLowerCase().includes(q)) return false;
      }
      return true;
    });

    switch (sortBy) {
      case 'price-asc': result = [...result].sort((a, b) => a.price - b.price); break;
      case 'price-desc': result = [...result].sort((a, b) => b.price - a.price); break;
      case 'title-az': result = [...result].sort((a, b) => a.title.localeCompare(b.title)); break;
      case 'featured': result = [...result].sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0)); break;
    }
    return result;
  }, [products, selectedCategory, selectedLanguage, selectedAuthor, selectedPublication, priceRange, searchQuery, sortBy]);

  const clearFilters = () => {
    setSelectedCategory('all');
    setSelectedLanguage('all');
    setSelectedAuthor('all');
    setSelectedPublication('all');
    setPriceRange([0, 1500]);
    setSearchQuery('');
    navigate('/shop');
  };

  const hasActiveFilters =
    selectedCategory !== 'all' || selectedLanguage !== 'all' || selectedAuthor !== 'all' ||
    selectedPublication !== 'all' || priceRange[0] !== 0 || priceRange[1] !== 1500 || searchQuery;

  const FilterPanel = () => (
    <div className="space-y-6">
      {/* Search */}
      <div>
        <label className="label-book">Search</label>
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Title or author..."
          className="input-book"
        />
      </div>

      {/* Category */}
      <div>
        <label className="label-book">Category</label>
        <select
          value={selectedCategory}
          onChange={e => setSelectedCategory(e.target.value as CategoryId | 'all')}
          className="input-book cursor-pointer"
        >
          <option value="all">All Categories</option>
          {categories.map(cat => (
            <option key={cat.id} value={cat.id}>{cat.name}</option>
          ))}
        </select>
      </div>

      {/* Language */}
      <div>
        <label className="label-book">Language</label>
        <select
          value={selectedLanguage}
          onChange={e => setSelectedLanguage(e.target.value as Language | 'all')}
          className="input-book cursor-pointer"
        >
          <option value="all">All Languages</option>
          <option value="Marathi">Marathi</option>
          <option value="Hindi">Hindi</option>
          <option value="Sanskrit">Sanskrit</option>
          <option value="English">English</option>
        </select>
      </div>

      {/* Author */}
      <div>
        <label className="label-book">Author</label>
        <select
          value={selectedAuthor}
          onChange={e => setSelectedAuthor(e.target.value)}
          className="input-book cursor-pointer"
        >
          <option value="all">All Authors</option>
          {authors.map(a => (
            <option key={a} value={a}>{a}</option>
          ))}
        </select>
      </div>

      {/* Publication */}
      <div>
        <label className="label-book">Publication</label>
        <select
          value={selectedPublication}
          onChange={e => setSelectedPublication(e.target.value)}
          className="input-book cursor-pointer"
        >
          <option value="all">All Publications</option>
          {publications.map(p => (
            <option key={p} value={p}>{p}</option>
          ))}
        </select>
      </div>

      {/* Price */}
      <div>
        <label className="label-book">Price Range</label>
        <div className="flex items-center gap-3">
          <input
            type="number"
            value={priceRange[0]}
            onChange={e => setPriceRange([Number(e.target.value), priceRange[1]])}
            className="input-book"
            min={0}
            placeholder="Min"
          />
          <span className="text-ink-400 text-sm">—</span>
          <input
            type="number"
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], Number(e.target.value)])}
            className="input-book"
            min={0}
            placeholder="Max"
          />
        </div>
      </div>

      {hasActiveFilters && (
        <button onClick={clearFilters} className="text-sm text-gold-700 hover:text-gold-600 flex items-center gap-1.5">
          <X className="w-3.5 h-3.5" />
          Clear All Filters
        </button>
      )}
    </div>
  );

  return (
    <div className="animate-fade-in">
      {/* Page header */}
      <div className="bg-ink-900 text-parchment-100 py-12 lg:py-16">
        <div className="container-book">
          <div className="flex items-center gap-3 mb-3">
            <div className="h-px w-10 bg-gold-500" />
            <span className="text-xs tracking-[0.3em] uppercase text-gold-400">Bookstore</span>
          </div>
          <h1 className="font-display text-3xl lg:text-5xl">Browse Our Collection</h1>
          <p className="mt-3 text-parchment-300 max-w-2xl">
            Religious, spiritual, and Sanskrit literature in Marathi, Hindi, and Sanskrit
          </p>
        </div>
      </div>

      <div className="container-book py-10 lg:py-14">
        {/* Mobile filter toggle */}
        <div className="lg:hidden mb-6 flex items-center justify-between gap-4">
          <button
            onClick={() => setFiltersOpen(true)}
            className="inline-flex items-center gap-2 border border-brown-500/30 px-4 py-2.5 text-sm text-ink-800"
          >
            <SlidersHorizontal className="w-4 h-4" strokeWidth={1.5} />
            Filters
          </button>
          <div className="flex items-center gap-3">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as SortOption)}
              className="border border-brown-500/30 px-3 py-2.5 text-sm bg-parchment-50 text-ink-800 focus:outline-none focus:border-gold-600"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="title-az">Title: A to Z</option>
            </select>
            <div className="flex border border-brown-500/30">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-2.5 ${viewMode === 'grid' ? 'bg-ink-800 text-parchment-100' : 'text-ink-600'}`}
                aria-label="Grid view"
              >
                <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-2.5 ${viewMode === 'list' ? 'bg-ink-800 text-parchment-100' : 'text-ink-600'}`}
                aria-label="List view"
              >
                <List className="w-4 h-4" strokeWidth={1.5} />
              </button>
            </div>
          </div>
        </div>

        <div className="flex gap-10">
          {/* Desktop sidebar */}
          <aside className="hidden lg:block w-64 shrink-0">
            <div className="sticky top-28">
              <h2 className="font-display text-lg text-ink-900 mb-5 pb-3 border-b border-brown-500/15">Filters</h2>
              <FilterPanel />
            </div>
          </aside>

          {/* Main content */}
          <div className="flex-1 min-w-0">
            {/* Loading state */}
            {loading && (
              <div className="flex flex-col items-center justify-center py-20">
                <div className="w-10 h-10 border-2 border-brown-500/20 border-t-gold-600 rounded-full animate-spin mb-4" />
                <p className="text-sm text-ink-500">Loading books from our collection...</p>
              </div>
            )}

            {/* Error state */}
            {!loading && error && source === 'fallback' && (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <AlertCircle className="w-10 h-10 text-saffron-600 mb-4" strokeWidth={1.5} />
                <p className="font-serif text-lg text-ink-800">Unable to load live catalogue</p>
                <p className="text-sm text-ink-500 mt-2 max-w-md">
                  We're showing a sample of our collection. Please try again for the full catalogue.
                </p>
                <button onClick={refetch} className="btn-secondary mt-6 inline-flex items-center gap-2">
                  <RefreshCw className="w-4 h-4" strokeWidth={1.5} />
                  Retry
                </button>
              </div>
            )}

            {/* Desktop toolbar */}
            {!loading && (
              <>
                <div className="hidden lg:flex items-center justify-between mb-6 pb-4 border-b border-brown-500/15">
                  <p className="text-sm text-ink-600">
                    {filteredBooks.length} {filteredBooks.length === 1 ? 'book' : 'books'} found
                  </p>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm text-ink-600">Sort by:</span>
                      <select
                        value={sortBy}
                        onChange={e => setSortBy(e.target.value as SortOption)}
                        className="border border-brown-500/30 px-3 py-2 text-sm bg-parchment-50 text-ink-800 focus:outline-none focus:border-gold-600 cursor-pointer"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-asc">Price: Low to High</option>
                        <option value="price-desc">Price: High to Low</option>
                        <option value="title-az">Title: A to Z</option>
                      </select>
                    </div>
                    <div className="flex border border-brown-500/30">
                      <button
                        onClick={() => setViewMode('grid')}
                        className={`p-2.5 ${viewMode === 'grid' ? 'bg-ink-800 text-parchment-100' : 'text-ink-600'}`}
                        aria-label="Grid view"
                      >
                        <LayoutGrid className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                      <button
                        onClick={() => setViewMode('list')}
                        className={`p-2.5 ${viewMode === 'list' ? 'bg-ink-800 text-parchment-100' : 'text-ink-600'}`}
                        aria-label="List view"
                      >
                        <List className="w-4 h-4" strokeWidth={1.5} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Results */}
                {filteredBooks.length === 0 ? (
                  <div className="text-center py-20">
                    <BookOpen className="w-10 h-10 text-brown-400 mx-auto mb-4" strokeWidth={1} />
                    <p className="font-serif text-xl text-ink-800">No books found</p>
                    <p className="text-sm text-ink-500 mt-2">Try adjusting your filters or search terms</p>
                    <button onClick={clearFilters} className="btn-secondary mt-6">
                      Clear Filters
                    </button>
                  </div>
                ) : (
                  <div className={viewMode === 'grid'
                    ? 'grid grid-cols-2 md:grid-cols-3 gap-5 lg:gap-6'
                    : 'space-y-5'
                  }>
                    {filteredBooks.map(book => (
                      <BookCard key={book.id} book={book} variant={viewMode} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <>
          <div className="fixed inset-0 bg-ink-900/50 z-50 lg:hidden" onClick={() => setFiltersOpen(false)} />
          <div className="fixed left-0 top-0 bottom-0 w-[85%] max-w-sm bg-parchment-50 z-50 lg:hidden overflow-y-auto animate-slide-in p-5">
            <div className="flex items-center justify-between mb-6 pb-3 border-b border-brown-500/15">
              <h2 className="font-display text-lg text-ink-900">Filters</h2>
              <button onClick={() => setFiltersOpen(false)} className="text-ink-500 p-1" aria-label="Close filters">
                <X className="w-5 h-5" strokeWidth={1.5} />
              </button>
            </div>
            <FilterPanel />
            <button
              onClick={() => setFiltersOpen(false)}
              className="btn-primary w-full mt-8"
            >
              Show {filteredBooks.length} Results
            </button>
          </div>
        </>
      )}
    </div>
  );
}

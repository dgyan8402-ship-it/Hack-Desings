import React from 'react';
import { Product, FilterState, ProductCategory, FragranceFamily } from '../types';
import { ProductCard } from './ProductCard';
import { Sparkles, SlidersHorizontal, RotateCcw, Search, ChevronDown, Check } from 'lucide-react';
import { BRAND } from '../data/brand';

interface ProductGridProps {
  products: Product[];
  filterState: FilterState;
  onUpdateFilters: (updates: Partial<FilterState>) => void;
  onResetFilters: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  wishlistProductIds: string[];
  onQuickView: (product: Product) => void;
}

const CATEGORIES: ProductCategory[] = [
  'All',
  'Perfumes',
  'Body Lotions',
  'Body Mists',
  'Deodorants',
  'Fragrance Oils'
];

const FAMILIES: FragranceFamily[] = [
  'All',
  'Fresh & Clean',
  'Sweet & Floral',
  'Woody & Elegant',
  'Warm & Sensual',
  'Amber & Oriental'
];

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  filterState,
  onUpdateFilters,
  onResetFilters,
  onAddToCart,
  onToggleWishlist,
  wishlistProductIds,
  onQuickView
}) => {
  const [showMobileFilters, setShowMobileFilters] = React.useState(false);

  // Active filters count
  const activeFiltersCount = 
    (filterState.category !== 'All' ? 1 : 0) +
    (filterState.fragranceFamily !== 'All' ? 1 : 0) +
    (filterState.minRating > 0 ? 1 : 0) +
    (filterState.priceRange[1] < 300 ? 1 : 0) +
    (filterState.searchQuery.trim() !== '' ? 1 : 0);

  return (
    <section id="shop" className="py-20 bg-transparent relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>The Artisanal Collection</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#F5F5F0] tracking-tight">
            Curated For <span className="italic text-gold-gradient font-normal">Every Sensation</span>
          </h2>

          <p className="text-[#b8afa3] text-sm sm:text-base font-light">
            Handcrafted with sustainably sourced rare botanicals, natural extracts, and rich perfume concentrates.
          </p>
        </div>

        {/* Primary Category Filter Bar */}
        <div className="flex items-center justify-center overflow-x-auto pb-4 gap-2 sm:gap-3 no-scrollbar">
          {CATEGORIES.map((cat) => {
            const isActive = filterState.category === cat;
            return (
              <button
                key={cat}
                onClick={() => onUpdateFilters({ category: cat })}
                className={`px-6 py-2.5 rounded-full text-xs sm:text-sm tracking-wider uppercase font-medium whitespace-nowrap transition-all duration-300 ${
                  isActive
                    ? 'bg-[#D4AF37] text-black font-bold shadow-lg shadow-[#D4AF37]/20 scale-105'
                    : 'glass-panel-dark text-[#c7beaf] hover:text-[#F5F5F0] hover:border-white/30'
                }`}
              >
                {cat === 'All' ? 'All Products' : cat}
              </button>
            );
          })}
        </div>

        {/* Secondary Filter & Sort Toolbar */}
        <div className="mt-8 mb-8 p-4 rounded-2xl glass-panel-dark flex flex-wrap items-center justify-between gap-4 border border-white/10 shadow-lg">
          
          {/* Left: Fragrance Family Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-1 sm:pb-0">
            <span className="text-xs text-[#8e857b] font-medium uppercase tracking-wider hidden sm:inline">
              Notes:
            </span>
            {FAMILIES.map((fam) => {
              const isSelected = filterState.fragranceFamily === fam;
              return (
                <button
                  key={fam}
                  onClick={() => onUpdateFilters({ fragranceFamily: fam })}
                  className={`text-[11px] px-3.5 py-1.5 rounded-full whitespace-nowrap transition-colors ${
                    isSelected
                      ? 'bg-[#D4AF37]/20 text-[#F5F5F0] border border-[#D4AF37]/50 font-semibold'
                      : 'bg-white/5 text-[#a89f92] hover:text-[#F5F5F0] hover:bg-white/10 border border-white/5'
                  }`}
                >
                  {fam}
                </button>
              );
            })}
          </div>

          {/* Right: Search, Sorting & Toggle */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
            
            {/* Search Input In Bar */}
            <div className="relative flex-1 sm:w-56">
              <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8e857b]" />
              <input
                type="text"
                value={filterState.searchQuery}
                onChange={(e) => onUpdateFilters({ searchQuery: e.target.value })}
                placeholder="Search scents..."
                className="w-full bg-black/40 border border-white/10 rounded-full pl-9 pr-3 py-1.5 text-xs text-[#F5F5F0] placeholder-[#8e857b] focus:outline-none focus:border-[#D4AF37]/50"
              />
              {filterState.searchQuery && (
                <button
                  onClick={() => onUpdateFilters({ searchQuery: '' })}
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#8e857b] hover:text-white"
                >
                  ✕
                </button>
              )}
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <select
                value={filterState.sortBy}
                onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
                className="appearance-none bg-black/40 border border-white/10 rounded-full px-4 py-1.5 pr-8 text-xs text-[#D4AF37] focus:outline-none focus:border-[#D4AF37]/50 cursor-pointer"
              >
                <option value="featured" className="bg-[#121212] text-[#F5F5F0]">Featured Blends</option>
                <option value="price-asc" className="bg-[#121212] text-[#F5F5F0]">Price: Low to High</option>
                <option value="price-desc" className="bg-[#121212] text-[#F5F5F0]">Price: High to Low</option>
                <option value="rating" className="bg-[#121212] text-[#F5F5F0]">Highest Rated</option>
                <option value="newest" className="bg-[#121212] text-[#F5F5F0]">Newest Arrivals</option>
              </select>
              <ChevronDown className="w-3.5 h-3.5 absolute right-2.5 top-1/2 -translate-y-1/2 text-[#8e857b] pointer-events-none" />
            </div>

            {/* Advanced Filters Button (Mobile/Desktop) */}
            <button
              onClick={() => setShowMobileFilters(!showMobileFilters)}
              className={`p-2 rounded-full border transition-colors relative flex items-center gap-1.5 text-xs ${
                activeFiltersCount > 0
                  ? 'bg-[#D4AF37]/20 border-[#D4AF37]/40 text-[#D4AF37]'
                  : 'bg-white/5 border-white/10 text-[#a89f92] hover:text-white'
              }`}
              title="Toggle filter controls"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="hidden md:inline">Filters</span>
              {activeFiltersCount > 0 && (
                <span className="w-4 h-4 bg-[#D4AF37] text-black rounded-full text-[10px] font-bold flex items-center justify-center">
                  {activeFiltersCount}
                </span>
              )}
            </button>

          </div>

        </div>

        {/* Expanded Filters Drawer / Panel */}
        {showMobileFilters && (
          <div className="mb-8 p-5 rounded-2xl glass-panel-dark border border-white/15 grid grid-cols-1 sm:grid-cols-3 gap-6 animate-fadeIn shadow-2xl">
            
            {/* Price Range Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-[#b8afa3]">
                <span>Max Price:</span>
                <span className="text-[#D4AF37] font-semibold">{BRAND.currencySymbol} {filterState.priceRange[1]}</span>
              </div>
              <input
                type="range"
                min="50"
                max="300"
                step="10"
                value={filterState.priceRange[1]}
                onChange={(e) => onUpdateFilters({ priceRange: [filterState.priceRange[0], Number(e.target.value)] })}
                className="w-full accent-[#D4AF37] cursor-pointer"
              />
              <div className="flex justify-between text-[10px] text-[#8e857b]">
                <span>{BRAND.currencySymbol} 50</span>
                <span>{BRAND.currencySymbol} 300+</span>
              </div>
            </div>

            {/* Minimum Rating */}
            <div className="space-y-2">
              <label className="text-xs text-[#b8afa3] block">Minimum Rating</label>
              <div className="flex gap-2">
                {[0, 4, 4.5, 4.8].map((ratingVal) => (
                  <button
                    key={ratingVal}
                    onClick={() => onUpdateFilters({ minRating: ratingVal })}
                    className={`text-xs px-3 py-1.5 rounded-full border transition-colors ${
                      filterState.minRating === ratingVal
                        ? 'bg-[#D4AF37] text-black font-bold border-[#D4AF37]'
                        : 'bg-white/5 border-white/10 text-[#b8afa3] hover:text-white'
                    }`}
                  >
                    {ratingVal === 0 ? 'All' : `★ ${ratingVal}+`}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-end justify-between sm:justify-end gap-3">
              <button
                onClick={onResetFilters}
                className="flex items-center gap-1.5 text-xs text-[#8e857b] hover:text-[#E2A89B] transition-colors py-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset All Filters</span>
              </button>
            </div>

          </div>
        )}

        {/* Active Filter Badges */}
        {activeFiltersCount > 0 && (
          <div className="mb-6 flex flex-wrap items-center gap-2">
            <span className="text-xs text-[#8e857b]">Active Filters:</span>
            
            {filterState.category !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs border border-[#D4AF37]/30">
                {filterState.category}
                <button onClick={() => onUpdateFilters({ category: 'All' })} className="hover:text-white">✕</button>
              </span>
            )}

            {filterState.fragranceFamily !== 'All' && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#D4AF37]/15 text-[#D4AF37] text-xs border border-[#D4AF37]/30">
                {filterState.fragranceFamily}
                <button onClick={() => onUpdateFilters({ fragranceFamily: 'All' })} className="hover:text-white">✕</button>
              </span>
            )}

            {filterState.searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F5F5F0] text-xs border border-white/10">
                Keyword: "{filterState.searchQuery}"
                <button onClick={() => onUpdateFilters({ searchQuery: '' })} className="hover:text-[#D4AF37]">✕</button>
              </span>
            )}

            {filterState.priceRange[1] < 300 && (
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-[#F5F5F0] text-xs border border-white/10">
                Under {BRAND.currencySymbol}{filterState.priceRange[1]}
                <button onClick={() => onUpdateFilters({ priceRange: [0, 300] })} className="hover:text-[#D4AF37]">✕</button>
              </span>
            )}

            <button
              onClick={onResetFilters}
              className="text-xs text-[#D4AF37] underline ml-2 hover:text-white"
            >
              Clear All
            </button>
          </div>
        )}

        {/* Product Grid Results */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-8">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={onAddToCart}
                onToggleWishlist={onToggleWishlist}
                isWishlisted={wishlistProductIds.includes(product.id)}
                onQuickView={onQuickView}
              />
            ))}
          </div>
        ) : (
          /* Empty State */
          <div className="text-center py-20 glass-panel-dark rounded-[2rem] p-8 border border-white/10 max-w-lg mx-auto space-y-4 shadow-2xl">
            <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mx-auto text-[#D4AF37]">
              <Search className="w-7 h-7 opacity-60" />
            </div>
            <h3 className="text-2xl font-serif text-[#F5F5F0]">No Matching Fragrances Found</h3>
            <p className="text-sm text-[#8e857b] max-w-md mx-auto">
              We couldn't find any products matching your current filters. Try relaxing your price or category filters to explore the rest of the collection.
            </p>
            <button
              onClick={onResetFilters}
              className="px-6 py-3 rounded-full bg-[#D4AF37] text-black font-semibold text-xs uppercase tracking-wider hover:bg-white transition-colors shadow-lg"
            >
              Show All Products
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

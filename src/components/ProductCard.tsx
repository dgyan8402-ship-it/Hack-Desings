import React, { useState } from 'react';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import { Product } from '../types';
import { BRAND } from '../data/brand';

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onQuickView
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [addedAnimation, setAddedAnimation] = useState(false);

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const calculatedPrice = Math.round(product.price * (selectedSize?.priceMultiplier || 1));

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, selectedSize.size, 1);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleWishlistClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onToggleWishlist(product);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-[2rem] overflow-hidden glass-panel-card cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/50 hover:shadow-[0_20px_45px_rgba(0,0,0,0.7),0_0_25px_rgba(212,175,55,0.15)] flex flex-col justify-between shadow-xl"
    >
      {/* Top Image Container */}
      <div className="relative aspect-[4/5] w-full overflow-hidden bg-[#121212]">
        
        {/* Main Product Image */}
        <img
          src={product.image}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center transform transition-transform duration-700 ease-out group-hover:scale-108 filter brightness-95 group-hover:brightness-105"
          loading="lazy"
        />

        {/* Subtle Vignette Gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-black/30 pointer-events-none" />

        {/* Badges (Top Left) */}
        <div className="absolute top-3.5 left-3.5 z-10 flex flex-col gap-1.5 pointer-events-none">
          {product.isBestSeller && (
            <span className="px-3 py-0.5 rounded-full bg-[#D4AF37] text-black text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              Bestseller
            </span>
          )}
          {product.isNew && (
            <span className="px-3 py-0.5 rounded-full bg-[#E2A89B] text-black text-[10px] font-extrabold uppercase tracking-widest shadow-md">
              New Scent
            </span>
          )}
          {product.originalPrice && (
            <span className="px-2.5 py-0.5 rounded-full bg-red-900/80 text-white border border-red-500/30 text-[10px] font-semibold tracking-wider backdrop-blur-md">
              Save {BRAND.currencySymbol}{product.originalPrice - product.price}
            </span>
          )}
        </div>

        {/* Wishlist Button (Top Right) */}
        <button
          onClick={handleWishlistClick}
          className={`absolute top-3.5 right-3.5 z-10 p-2.5 rounded-full backdrop-blur-md transition-all duration-300 ${
            isWishlisted
              ? 'bg-[#E2A89B] text-black shadow-lg scale-110'
              : 'bg-black/50 text-white/80 hover:text-[#E2A89B] hover:bg-black/70 border border-white/10'
          }`}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-black' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div
          className={`absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-300 pointer-events-none ${
            isHovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <span className="px-4 py-2 rounded-full glass-panel-dark text-xs font-semibold tracking-widest uppercase text-[#F5F5F0] border border-white/20 flex items-center gap-2 transform transition-transform group-hover:scale-100 scale-95 shadow-xl">
            <Eye className="w-3.5 h-3.5 text-[#D4AF37]" />
            <span>Quick View</span>
          </span>
        </div>

        {/* Fragrance Family Tag (Bottom of image) */}
        <div className="absolute bottom-3.5 left-3.5 z-10">
          <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] font-medium text-[#D4AF37] border border-white/10 uppercase tracking-wider">
            {product.fragranceFamily}
          </span>
        </div>
      </div>

      {/* Card Body Details */}
      <div className="p-5 flex flex-col justify-between flex-1 space-y-3.5 bg-white/[0.02]">
        
        {/* Title, Category & Ratings */}
        <div className="space-y-1.5">
          <div className="flex items-center justify-between text-xs text-[#8e857b]">
            <span className="uppercase tracking-widest text-[10px] text-[#D4AF37] font-semibold">
              {product.category}
            </span>
            <div className="flex items-center gap-1 text-[#D4AF37]">
              <Star className="w-3.5 h-3.5 fill-[#D4AF37]" />
              <span className="font-semibold text-[11px] text-[#F5F5F0]">{product.rating.toFixed(1)}</span>
              <span className="text-[10px] text-[#8e857b]">({product.reviewCount})</span>
            </div>
          </div>

          <h3 className="font-serif text-lg sm:text-xl font-medium text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors line-clamp-1">
            {product.name}
          </h3>

          <p className="text-xs text-[#a89f92] line-clamp-2 font-light leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Scent Top Notes / Benefits snippet */}
        <div className="flex flex-wrap gap-1 pt-1">
          {product.topNotes.slice(0, 3).map((note, idx) => (
            <span
              key={idx}
              className="text-[10px] text-[#c7beaf] bg-white/[0.05] px-2.5 py-0.5 rounded-full border border-white/5 backdrop-blur-sm"
            >
              {note}
            </span>
          ))}
        </div>

        {/* Size Selection Chips (if multiple sizes) */}
        {product.sizes.length > 1 && (
          <div className="flex items-center gap-1.5 pt-1" onClick={(e) => e.stopPropagation()}>
            {product.sizes.map((sz, idx) => (
              <button
                key={sz.size}
                onClick={() => setSelectedSizeIndex(idx)}
                className={`text-[10px] px-2.5 py-0.5 rounded-full transition-all ${
                  selectedSizeIndex === idx
                    ? 'bg-[#D4AF37] text-black font-bold'
                    : 'bg-white/5 text-[#8e857b] hover:text-[#F5F5F0] hover:bg-white/10'
                }`}
              >
                {sz.size.split(' ')[0]}
              </button>
            ))}
          </div>
        )}

        {/* Pricing & Add to Cart Action */}
        <div className="pt-2 border-t border-white/10 flex items-center justify-between gap-3">
          <div>
            <div className="text-[10px] text-[#8e857b] uppercase tracking-wider">
              {selectedSize.size}
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-serif font-bold text-[#F5F5F0]">
                {BRAND.currencySymbol} {calculatedPrice}
              </span>
              {product.originalPrice && selectedSizeIndex === 0 && (
                <span className="text-xs text-[#8e857b] line-through">
                  {BRAND.currencySymbol} {product.originalPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={handleQuickAdd}
            disabled={!product.inStock}
            className={`px-4 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center gap-1.5 shadow-md ${
              addedAnimation
                ? 'bg-emerald-600 text-white'
                : product.inStock
                ? 'bg-[#D4AF37]/15 hover:bg-[#D4AF37] text-[#D4AF37] hover:text-black border border-[#D4AF37]/30 backdrop-blur-sm'
                : 'bg-white/5 text-[#6b6257] cursor-not-allowed'
            }`}
            aria-label={`Add ${product.name} to cart`}
          >
            {addedAnimation ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span className="hidden xs:inline">Add</span>
              </>
            )}
          </button>
        </div>

      </div>
    </div>
  );
};

import React, { useState, useEffect } from 'react';
import { X, Star, Heart, ShoppingBag, Zap, ShieldCheck, Sparkles, Check, Droplets, Clock, Wind, ArrowRight } from 'lucide-react';
import { Product, ProductReview } from '../types';
import { BRAND } from '../data/brand';

interface ProductDetailModalProps {
  product: Product | null;
  allProducts: Product[];
  onClose: () => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onBuyNow: (product: Product, size: string, quantity: number) => void;
  onToggleWishlist: (product: Product) => void;
  isWishlisted: boolean;
  onSelectRelatedProduct: (product: Product) => void;
}

export const ProductDetailModal: React.FC<ProductDetailModalProps> = ({
  product,
  allProducts,
  onClose,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  isWishlisted,
  onSelectRelatedProduct
}) => {
  const [activeImage, setActiveImage] = useState<string>(product?.image || '');
  const [selectedSizeIndex, setSelectedSizeIndex] = useState<number>(0);
  const [quantity, setQuantity] = useState<number>(1);
  const [activeTab, setActiveTab] = useState<'details' | 'notes' | 'benefits' | 'reviews'>('details');
  const [addedAnimation, setAddedAnimation] = useState<boolean>(false);

  // User review submission state
  const [reviewsList, setReviewsList] = useState<ProductReview[]>(product?.reviews || []);
  const [newReviewAuthor, setNewReviewAuthor] = useState('');
  const [newReviewComment, setNewReviewComment] = useState('');
  const [newReviewRating, setNewReviewRating] = useState(5);
  const [reviewSubmitted, setReviewSubmitted] = useState(false);

  useEffect(() => {
    if (product) {
      setActiveImage(product.image);
      setSelectedSizeIndex(0);
      setQuantity(1);
      setReviewsList(product.reviews || []);
      setReviewSubmitted(false);
    }
  }, [product?.id, product?.image]);

  // Handle escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const selectedSize = product.sizes[selectedSizeIndex] || product.sizes[0];
  const unitPrice = Math.round(product.price * (selectedSize?.priceMultiplier || 1));
  const totalPrice = unitPrice * quantity;

  const imagesGallery = [product.image, ...(product.additionalImages || [])];
  const currentImage = (activeImage && imagesGallery.includes(activeImage)) ? activeImage : product.image;

  const handleAddToCart = () => {
    onAddToCart(product, selectedSize.size, quantity);
    setAddedAnimation(true);
    setTimeout(() => setAddedAnimation(false), 1400);
  };

  const handleBuyNow = () => {
    onBuyNow(product, selectedSize.size, quantity);
  };

  const handleAddReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newReviewAuthor.trim() || !newReviewComment.trim()) return;

    const newRev: ProductReview = {
      id: `rev-${Date.now()}`,
      author: newReviewAuthor,
      rating: newReviewRating,
      date: 'Just now',
      comment: newReviewComment,
      verified: true
    };

    setReviewsList([newRev, ...reviewsList]);
    setNewReviewAuthor('');
    setNewReviewComment('');
    setReviewSubmitted(true);
    setTimeout(() => setReviewSubmitted(false), 4000);
  };

  // Related products from same category or same fragrance family
  const relatedProducts = allProducts
    .filter((p) => p.id !== product.id && (p.category === product.category || p.fragranceFamily === product.fragranceFamily))
    .slice(0, 3);

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/75 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      {/* Modal Card */}
      <div className="relative w-full max-w-5xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Top Sticky Bar with Close Button */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              {product.category}
            </span>
            <span className="text-[#6b6257]">•</span>
            <span className="text-xs text-[#b8afa3] font-serif">{product.name}</span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#8e857b] hover:text-[#F5F5F0] transition-colors"
            aria-label="Close product details"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Modal Content */}
        <div className="overflow-y-auto p-6 sm:p-8 lg:p-10 space-y-10">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            
            {/* Left: Gallery & Image Showcase (5 Cols) */}
            <div className="lg:col-span-6 space-y-4">
              
              {/* Main Image */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-black/40 border border-white/10 group shadow-inner">
                <img
                  src={currentImage}
                  alt={product.name}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transition-all duration-500 group-hover:scale-105"
                />

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-[#D4AF37] text-[11px] font-semibold tracking-wider uppercase border border-white/10">
                    {product.concentration || 'Pure Extrait'}
                  </span>
                </div>

                {/* Wishlist Button */}
                <button
                  onClick={() => onToggleWishlist(product)}
                  className={`absolute top-4 right-4 p-3 rounded-full backdrop-blur-md transition-all ${
                    isWishlisted
                      ? 'bg-[#E2A89B] text-black shadow-lg scale-110'
                      : 'bg-black/50 text-white hover:text-[#E2A89B] border border-white/10'
                  }`}
                  aria-label="Toggle Wishlist"
                >
                  <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-black' : ''}`} />
                </button>
              </div>

              {/* Thumbnail Selector */}
              {imagesGallery.length > 1 && (
                <div className="flex gap-3 overflow-x-auto pb-2">
                  {imagesGallery.map((img, idx) => (
                    <button
                      key={idx}
                      onClick={() => setActiveImage(img)}
                      className={`relative w-20 h-20 rounded-xl overflow-hidden border-2 transition-all flex-shrink-0 ${
                        currentImage === img
                          ? 'border-[#D4AF37] scale-105 shadow-md ring-1 ring-[#D4AF37]'
                          : 'border-white/10 opacity-60 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} perspective ${idx + 1}`}
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Sillage & Longevity Specifications */}
              <div className="grid grid-cols-2 gap-3 p-4 rounded-2xl glass-panel-dark border border-white/10">
                <div className="flex items-center gap-3">
                  <Clock className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#8e857b]">Longevity</div>
                    <div className="text-xs font-semibold text-[#F5F5F0]">{product.longevity || '12-16 Hours'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <Wind className="w-5 h-5 text-[#D4AF37]" />
                  <div>
                    <div className="text-[10px] uppercase tracking-wider text-[#8e857b]">Sillage</div>
                    <div className="text-xs font-semibold text-[#F5F5F0]">{product.sillage || 'Magnetic Trail'}</div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right: Product Details & Cart Controls (7 Cols) */}
            <div className="lg:col-span-6 space-y-6 flex flex-col justify-between">
              
              <div className="space-y-4">
                
                {/* Family and Rating */}
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs font-medium uppercase tracking-wider backdrop-blur-md">
                    {product.fragranceFamily}
                  </span>

                  <div className="flex items-center gap-1.5 text-xs text-[#D4AF37]">
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <Star
                          key={s}
                          className={`w-4 h-4 ${
                            s <= Math.round(product.rating)
                              ? 'fill-[#D4AF37] text-[#D4AF37]'
                              : 'text-white/20'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="font-bold text-[#F5F5F0]">{product.rating.toFixed(1)}</span>
                    <span className="text-[#8e857b]">({product.reviewCount} reviews)</span>
                  </div>
                </div>

                {/* Product Title & Subtitle */}
                <div>
                  <h1 className="text-3xl sm:text-4xl font-serif font-light text-[#F5F5F0]">
                    {product.name}
                  </h1>
                  <p className="text-xs sm:text-sm text-[#b8afa3] font-mono mt-1">
                    {product.subtitle}
                  </p>
                </div>

                {/* Price Display */}
                <div className="flex items-baseline gap-3 pt-2">
                  <span className="text-3xl font-serif font-bold text-gold-gradient">
                    {BRAND.currencySymbol} {unitPrice}
                  </span>
                  {product.originalPrice && selectedSizeIndex === 0 && (
                    <span className="text-lg text-[#8e857b] line-through font-serif">
                      {BRAND.currencySymbol} {product.originalPrice}
                    </span>
                  )}
                  <span className="text-xs text-[#8e857b] uppercase tracking-wider">
                    ({selectedSize.size})
                  </span>
                </div>

                {/* Short Description */}
                <p className="text-sm text-[#d8cfc4] font-light leading-relaxed">
                  {product.description}
                </p>

                {/* Size Selector */}
                <div className="space-y-2 pt-2">
                  <label className="text-xs uppercase tracking-widest text-[#8e857b] font-semibold block">
                    Select Size / Volume
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                    {product.sizes.map((sz, idx) => {
                      const szPrice = Math.round(product.price * sz.priceMultiplier);
                      const isSelected = selectedSizeIndex === idx;
                      return (
                        <button
                          key={sz.size}
                          onClick={() => setSelectedSizeIndex(idx)}
                          className={`p-3 rounded-xl border text-left transition-all ${
                            isSelected
                              ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F5F0] shadow-md ring-1 ring-[#D4AF37]'
                              : 'border-white/10 bg-white/5 text-[#a89f92] hover:text-[#F5F5F0] hover:bg-white/10'
                          }`}
                        >
                          <div className="text-xs font-semibold">{sz.size}</div>
                          <div className="text-[11px] text-[#D4AF37] font-mono mt-0.5">
                            {BRAND.currencySymbol} {szPrice}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Quantity & CTA Buttons */}
                <div className="pt-4 space-y-3">
                  
                  <div className="flex items-center gap-3">
                    {/* Quantity Stepper */}
                    <div className="flex items-center rounded-full bg-white/5 border border-white/10 p-1">
                      <button
                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                        className="w-9 h-9 flex items-center justify-center text-[#F5F5F0] hover:bg-white/10 rounded-full text-lg transition-colors"
                      >
                        -
                      </button>
                      <span className="w-10 text-center font-serif text-base text-[#F5F5F0]">
                        {quantity}
                      </span>
                      <button
                        onClick={() => setQuantity(quantity + 1)}
                        className="w-9 h-9 flex items-center justify-center text-[#F5F5F0] hover:bg-white/10 rounded-full text-lg transition-colors"
                      >
                        +
                      </button>
                    </div>

                    {/* Add to Cart Button */}
                    <button
                      onClick={handleAddToCart}
                      className={`flex-1 py-3.5 px-6 rounded-full font-bold text-xs uppercase tracking-widest transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                        addedAnimation
                          ? 'bg-emerald-600 text-white'
                          : 'bg-[#D4AF37] hover:bg-white text-black hover:shadow-[0_0_25px_rgba(212,175,55,0.4)] hover:scale-[1.01]'
                      }`}
                    >
                      {addedAnimation ? (
                        <>
                          <Check className="w-4 h-4" />
                          <span>Added to Cart</span>
                        </>
                      ) : (
                        <>
                          <ShoppingBag className="w-4 h-4" />
                          <span>Add to Cart ({BRAND.currencySymbol} {totalPrice})</span>
                        </>
                      )}
                    </button>
                  </div>

                  {/* Instant Buy Now Button */}
                  <button
                    onClick={handleBuyNow}
                    className="w-full py-3.5 px-6 rounded-full glass-panel-dark border border-white/20 text-[#D4AF37] hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-widest transition-all flex items-center justify-center gap-2"
                  >
                    <Zap className="w-4 h-4 text-[#D4AF37]" />
                    <span>Instant Express Checkout</span>
                  </button>

                </div>

                {/* Delivery Guarantee Notes */}
                <div className="pt-3 border-t border-white/10 flex flex-col gap-2 text-xs text-[#a89f92]">
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>100% Authentic Artisanal Formulation • Guaranteed Fragrance Longevity</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                    <span>Includes complimentary fragrance testing vial with each shipment</span>
                  </div>
                </div>

              </div>

            </div>

          </div>

          {/* Tabbed Info Section (Notes Pyramid, Skin Benefits, Reviews) */}
          <div className="border-t border-white/10 pt-8 space-y-6">
            
            {/* Tab Headers */}
            <div className="flex items-center gap-4 border-b border-white/10 overflow-x-auto pb-2">
              <button
                onClick={() => setActiveTab('details')}
                className={`text-xs uppercase tracking-wider pb-2 font-semibold transition-colors relative ${
                  activeTab === 'details' ? 'text-[#D4AF37]' : 'text-[#8e857b] hover:text-[#F5F5F0]'
                }`}
              >
                Olfactory Pyramid & Notes
                {activeTab === 'details' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />}
              </button>

              {product.benefits && (
                <button
                  onClick={() => setActiveTab('benefits')}
                  className={`text-xs uppercase tracking-wider pb-2 font-semibold transition-colors relative ${
                    activeTab === 'benefits' ? 'text-[#D4AF37]' : 'text-[#8e857b] hover:text-[#F5F5F0]'
                  }`}
                >
                  Skin Benefits & Ingredients
                  {activeTab === 'benefits' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />}
                </button>
              )}

              <button
                onClick={() => setActiveTab('reviews')}
                className={`text-xs uppercase tracking-wider pb-2 font-semibold transition-colors relative ${
                  activeTab === 'reviews' ? 'text-[#D4AF37]' : 'text-[#8e857b] hover:text-[#F5F5F0]'
                }`}
              >
                Customer Reviews ({reviewsList.length})
                {activeTab === 'reviews' && <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37]" />}
              </button>
            </div>

            {/* Tab 1: Olfactory Pyramid */}
            {activeTab === 'details' && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                
                {/* Top Notes */}
                <div className="p-5 rounded-2xl glass-panel-dark border border-white/10 space-y-2 shadow-md">
                  <div className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    1. Top Notes (First 30 Mins)
                  </div>
                  <p className="text-xs text-[#8e857b]">The initial sparkling impression</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.topNotes.map((note, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#F5F5F0] border border-white/10">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Heart Notes */}
                <div className="p-5 rounded-2xl glass-panel-dark border border-white/10 space-y-2 shadow-md">
                  <div className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    2. Heart Notes (2 – 6 Hours)
                  </div>
                  <p className="text-xs text-[#8e857b]">The soul and character of the blend</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.heartNotes.map((note, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#F5F5F0] border border-white/10">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Base Notes */}
                <div className="p-5 rounded-2xl glass-panel-dark border border-white/10 space-y-2 shadow-md">
                  <div className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                    3. Base Notes (6 – 24 Hours)
                  </div>
                  <p className="text-xs text-[#8e857b]">The deep, long-lasting memory trail</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {product.baseNotes.map((note, i) => (
                      <span key={i} className="px-3 py-1 rounded-full bg-white/5 text-xs text-[#F5F5F0] border border-white/10">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>

              </div>
            )}

            {/* Tab 2: Skin Benefits (for Lotions) */}
            {activeTab === 'benefits' && (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {product.benefits?.map((benefit, i) => (
                    <div key={i} className="p-4 rounded-2xl glass-panel-dark border border-white/10 flex items-start gap-3 shadow-md">
                      <Droplets className="w-5 h-5 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                      <p className="text-xs sm:text-sm text-[#F5F5F0]">{benefit}</p>
                    </div>
                  ))}
                </div>

                {product.keyIngredients && (
                  <div className="p-5 rounded-2xl glass-panel-dark border border-white/10">
                    <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold mb-2">
                      Key Botanical & Skincare Actives
                    </h4>
                    <p className="text-xs text-[#b8afa3] leading-relaxed">
                      {product.keyIngredients.join(' • ')}
                    </p>
                  </div>
                )}
              </div>
            )}

            {/* Tab 3: Customer Reviews */}
            {activeTab === 'reviews' && (
              <div className="space-y-6">
                
                {/* Submit review form */}
                <form onSubmit={handleAddReview} className="p-5 rounded-2xl glass-panel-dark border border-white/10 space-y-4 shadow-lg">
                  <h4 className="text-sm font-serif font-medium text-[#F5F5F0]">Write a Scent Review</h4>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      value={newReviewAuthor}
                      onChange={(e) => setNewReviewAuthor(e.target.value)}
                      placeholder="Your Name (e.g. Ama Mensah)"
                      className="bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37]"
                    />

                    <div className="flex items-center gap-2">
                      <span className="text-xs text-[#8e857b]">Rating:</span>
                      <select
                        value={newReviewRating}
                        onChange={(e) => setNewReviewRating(Number(e.target.value))}
                        className="bg-black/40 border border-white/10 rounded-xl px-3 py-2 text-xs text-[#D4AF37] focus:outline-none"
                      >
                        <option value={5} className="bg-[#121212] text-[#F5F5F0]">★★★★★ (5/5 Exceptional)</option>
                        <option value={4} className="bg-[#121212] text-[#F5F5F0]">★★★★☆ (4/5 Very Good)</option>
                        <option value={3} className="bg-[#121212] text-[#F5F5F0]">★★★☆☆ (3/5 Average)</option>
                      </select>
                    </div>
                  </div>

                  <textarea
                    required
                    rows={2}
                    value={newReviewComment}
                    onChange={(e) => setNewReviewComment(e.target.value)}
                    placeholder="Describe how the fragrance evolved on your skin..."
                    className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37]"
                  />

                  <div className="flex items-center justify-between">
                    {reviewSubmitted && (
                      <span className="text-xs text-emerald-400">Thank you! Your verified review was added.</span>
                    )}
                    <button
                      type="submit"
                      className="ml-auto px-6 py-2 rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-md"
                    >
                      Post Review
                    </button>
                  </div>
                </form>

                {/* Reviews List */}
                <div className="space-y-3">
                  {reviewsList.length > 0 ? (
                    reviewsList.map((rev) => (
                      <div key={rev.id} className="p-4 rounded-xl glass-panel-dark border border-white/5 space-y-1.5">
                        <div className="flex items-center justify-between text-xs">
                          <span className="font-semibold text-[#F5F5F0]">{rev.author}</span>
                          <span className="text-[#8e857b]">{rev.date}</span>
                        </div>
                        <div className="flex text-[#D4AF37]">
                          {[...Array(rev.rating)].map((_, i) => (
                            <Star key={i} className="w-3 h-3 fill-[#D4AF37]" />
                          ))}
                        </div>
                        <p className="text-xs text-[#b8afa3]">{rev.comment}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-[#8e857b] italic">No reviews yet. Be the first to share your experience!</p>
                  )}
                </div>

              </div>
            )}

          </div>

          {/* Related Products Recommendation Row */}
          {relatedProducts.length > 0 && (
            <div className="border-t border-white/10 pt-8 space-y-4">
              <div className="flex items-center justify-between">
                <h3 className="font-serif text-xl text-[#F5F5F0]">Complete The Scent Ritual</h3>
                <span className="text-xs text-[#D4AF37]">Complementary blends</span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {relatedProducts.map((rel) => (
                  <div
                    key={rel.id}
                    onClick={() => onSelectRelatedProduct(rel)}
                    className="p-3 rounded-2xl glass-panel-dark border border-white/10 hover:border-[#D4AF37]/40 transition-all flex items-center gap-3 cursor-pointer group shadow-md"
                  >
                    <img
                      src={rel.image}
                      alt={rel.name}
                      referrerPolicy="no-referrer"
                      className="w-14 h-14 rounded-xl object-cover bg-black/40"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="text-xs font-semibold text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                        {rel.name}
                      </h4>
                      <p className="text-[10px] text-[#8e857b] truncate">{rel.category}</p>
                      <p className="text-xs font-serif text-[#D4AF37] font-bold mt-0.5">
                        {BRAND.currencySymbol} {rel.price}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>

      </div>
    </div>
  );
};

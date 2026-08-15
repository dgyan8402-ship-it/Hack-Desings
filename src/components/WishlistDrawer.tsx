import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { Product } from '../types';
import { BRAND } from '../data/brand';

interface WishlistDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  wishlistProducts: Product[];
  onRemoveWishlist: (productId: string) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const WishlistDrawer: React.FC<WishlistDrawerProps> = ({
  isOpen,
  onClose,
  wishlistProducts,
  onRemoveWishlist,
  onAddToCart,
  onQuickView
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="fixed inset-0 bg-black/70 backdrop-blur-md" onClick={onClose} />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 fill-[#E2A89B] text-[#E2A89B]" />
              <h3 className="font-serif text-xl text-[#F5F5F0]">Your Scent Wishlist</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[#E2A89B] font-mono border border-white/10">
                {wishlistProducts.length}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8e857b] hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {wishlistProducts.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#E2A89B]">
                  <Heart className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-serif text-xl text-[#F5F5F0]">No Fragrances Saved Yet</h4>
                <p className="text-xs text-[#8e857b] max-w-xs">
                  Tap the heart icon on any perfume or body lotion to keep track of your favorite artisanal blends.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-md"
                >
                  Browse Boutique
                </button>
              </div>
            ) : (
              wishlistProducts.map((product) => (
                <div
                  key={product.id}
                  className="p-4 rounded-2xl glass-panel-card border border-white/10 flex gap-3.5 items-center group cursor-pointer shadow-md"
                  onClick={() => {
                    onClose();
                    onQuickView(product);
                  }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-black/40 flex-shrink-0"
                  />

                  <div className="flex-1 min-w-0">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono">
                      {product.category}
                    </span>
                    <h4 className="text-sm font-serif font-medium text-[#F5F5F0] truncate group-hover:text-[#D4AF37] transition-colors">
                      {product.name}
                    </h4>
                    <div className="text-xs font-serif font-bold text-gold-gradient mt-0.5">
                      {BRAND.currencySymbol} {product.price}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 items-end" onClick={(e) => e.stopPropagation()}>
                    <button
                      onClick={() => onRemoveWishlist(product.id)}
                      className="p-1.5 text-[#8e857b] hover:text-red-400 transition-colors"
                      title="Remove from wishlist"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => {
                        onAddToCart(product, product.sizes[0]?.size || '50ml', 1);
                      }}
                      className="p-2 rounded-full bg-[#D4AF37] text-black text-xs font-bold hover:bg-white transition-colors shadow-sm"
                      title="Add to cart"
                    >
                      <ShoppingBag className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistProducts.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-white/[0.02]">
              <button
                onClick={() => {
                  wishlistProducts.forEach((p) => onAddToCart(p, p.sizes[0]?.size || '50ml', 1));
                  onClose();
                }}
                className="w-full py-3.5 px-6 rounded-full bg-[#D4AF37] hover:bg-white text-black font-bold text-xs uppercase tracking-widest hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                <span>Add All Items to Scent Bag</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

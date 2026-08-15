import React, { useState } from 'react';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Gift, Tag, Sparkles } from 'lucide-react';
import { CartItem } from '../types';
import { BRAND } from '../data/brand';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (cartItemId: string, newQuantity: number) => void;
  onRemoveItem: (cartItemId: string) => void;
  onProceedToCheckout: () => void;
  discountCode: string;
  onApplyDiscount: (code: string) => boolean;
  discountAmount: number;
  giftWrapping: boolean;
  onToggleGiftWrapping: (val: boolean) => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem,
  onProceedToCheckout,
  discountCode,
  onApplyDiscount,
  discountAmount,
  giftWrapping,
  onToggleGiftWrapping
}) => {
  const [promoInput, setPromoInput] = useState('');
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const giftWrapFee = giftWrapping ? 15 : 0;
  
  // Free delivery threshold: 250 GHS
  const FREE_SHIPPING_THRESHOLD = 250;
  const isFreeShipping = subtotal >= FREE_SHIPPING_THRESHOLD;
  const deliveryFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 25;
  const amountNeededForFreeShipping = Math.max(0, FREE_SHIPPING_THRESHOLD - subtotal);
  const freeShippingProgress = Math.min(100, (subtotal / FREE_SHIPPING_THRESHOLD) * 100);

  const total = Math.max(0, subtotal - discountAmount + giftWrapFee + deliveryFee);

  const handleApplyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setPromoError('');
    if (!promoInput.trim()) return;

    const valid = onApplyDiscount(promoInput.trim().toUpperCase());
    if (valid) {
      setPromoSuccess(true);
      setPromoError('');
    } else {
      setPromoError('Invalid coupon code. Try ELORA10 for 10% off.');
      setPromoSuccess(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity"
        onClick={onClose}
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-[#0A0A0A]/95 backdrop-blur-2xl border-l border-white/10 shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-6 border-b border-white/10 flex items-center justify-between bg-white/[0.02]">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-[#D4AF37]" />
              <h3 className="font-serif text-xl text-[#F5F5F0]">Your Scent Bag</h3>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/10 text-[#D4AF37] font-mono border border-white/10">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)}
              </span>
            </div>

            <button
              onClick={onClose}
              className="p-2 rounded-full text-[#8e857b] hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close cart"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Bar */}
          <div className="px-6 py-3 bg-white/[0.02] border-b border-white/10 space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              {isFreeShipping ? (
                <span className="text-emerald-400 font-medium flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" />
                  You've unlocked Complimentary Luxury Delivery!
                </span>
              ) : (
                <span className="text-[#b8afa3]">
                  Add <strong className="text-[#D4AF37]">{BRAND.currencySymbol} {amountNeededForFreeShipping}</strong> for Free Delivery
                </span>
              )}
              <span className="text-[10px] font-mono text-[#8e857b]">{Math.round(freeShippingProgress)}%</span>
            </div>
            <div className="w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
              <div
                className="h-full bg-[#D4AF37] transition-all duration-500 rounded-full"
                style={{ width: `${freeShippingProgress}%` }}
              />
            </div>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center space-y-4 py-12">
                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[#D4AF37]">
                  <ShoppingBag className="w-8 h-8 opacity-40" />
                </div>
                <h4 className="font-serif text-xl text-[#F5F5F0]">Your Bag is Empty</h4>
                <p className="text-xs text-[#8e857b] max-w-xs">
                  Discover your new signature perfume or velvety body lotion from our artisanal collection.
                </p>
                <button
                  onClick={onClose}
                  className="px-6 py-2.5 rounded-full bg-[#D4AF37] text-black text-xs font-bold uppercase tracking-wider hover:bg-white transition-colors shadow-md"
                >
                  Explore Fragrances
                </button>
              </div>
            ) : (
              cartItems.map((item) => (
                <div
                  key={item.id}
                  className="p-3.5 rounded-2xl glass-panel-card border border-white/10 flex gap-3.5 items-center group shadow-md"
                >
                  {/* Image */}
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover bg-black/40 flex-shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-serif font-medium text-[#F5F5F0] truncate">
                      {item.product.name}
                    </h4>
                    <div className="text-[11px] text-[#D4AF37] font-mono">
                      {item.selectedSize}
                    </div>
                    <div className="text-xs text-[#F5F5F0] font-semibold mt-0.5">
                      {BRAND.currencySymbol} {item.price}
                    </div>
                  </div>

                  {/* Quantity Stepper & Remove */}
                  <div className="flex flex-col items-end gap-2">
                    <button
                      onClick={() => onRemoveItem(item.id)}
                      className="text-[#8e857b] hover:text-red-400 p-1 transition-colors"
                      title="Remove item"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>

                    <div className="flex items-center rounded-lg bg-white/5 border border-white/10 p-0.5">
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#F5F5F0] hover:bg-white/10 rounded text-xs"
                      >
                        -
                      </button>
                      <span className="w-6 text-center text-xs font-mono text-[#F5F5F0]">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                        className="w-6 h-6 flex items-center justify-center text-[#F5F5F0] hover:bg-white/10 rounded text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                </div>
              ))
            )}
          </div>

          {/* Cart Footer: Summary, Promo, Checkout */}
          {cartItems.length > 0 && (
            <div className="p-6 border-t border-white/10 bg-white/[0.02] space-y-4">
              
              {/* Gift Wrapping Checkbox */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-white/[0.03] border border-white/5 text-xs">
                <label className="flex items-center gap-2.5 cursor-pointer text-[#e5d4b9]">
                  <input
                    type="checkbox"
                    checked={giftWrapping}
                    onChange={(e) => onToggleGiftWrapping(e.target.checked)}
                    className="rounded accent-[#D4AF37]"
                  />
                  <span className="flex items-center gap-1.5">
                    <Gift className="w-3.5 h-3.5 text-[#D4AF37]" />
                    Luxury Gift Box & Ribbon (+{BRAND.currencySymbol}15)
                  </span>
                </label>
              </div>

              {/* Promo Code Form */}
              <form onSubmit={handleApplyCode} className="space-y-1">
                <div className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-[#8e857b]" />
                    <input
                      type="text"
                      value={promoInput}
                      onChange={(e) => setPromoInput(e.target.value)}
                      placeholder="Promo code (e.g. ELORA10)"
                      className="w-full bg-black/40 border border-white/10 rounded-full pl-9 pr-3 py-2 text-xs text-[#F5F5F0] uppercase placeholder:normal-case placeholder-[#8e857b] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                  <button
                    type="submit"
                    className="px-5 py-2 rounded-full bg-white/10 hover:bg-white/20 text-[#F5F5F0] text-xs font-semibold uppercase tracking-wider transition-colors border border-white/10"
                  >
                    Apply
                  </button>
                </div>
                {promoSuccess && (
                  <p className="text-[11px] text-emerald-400">Coupon applied successfully (10% Off)!</p>
                )}
                {promoError && (
                  <p className="text-[11px] text-red-400">{promoError}</p>
                )}
              </form>

              {/* Price Calculation Breakdown */}
              <div className="space-y-1.5 text-xs text-[#b8afa3] pt-2 border-t border-white/5">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-mono text-[#F5F5F0]">{BRAND.currencySymbol} {subtotal}</span>
                </div>

                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-400">
                    <span>Special Privilege Discount</span>
                    <span className="font-mono">-{BRAND.currencySymbol} {discountAmount}</span>
                  </div>
                )}

                {giftWrapping && (
                  <div className="flex justify-between">
                    <span>Artisanal Gift Packaging</span>
                    <span className="font-mono text-[#F5F5F0]">+{BRAND.currencySymbol} 15</span>
                  </div>
                )}

                <div className="flex justify-between">
                  <span>Luxury Courier Delivery</span>
                  <span className="font-mono text-[#F5F5F0]">
                    {deliveryFee === 0 ? 'Complimentary' : `${BRAND.currencySymbol} ${deliveryFee}`}
                  </span>
                </div>

                <div className="flex justify-between text-base font-serif font-bold text-[#F5F5F0] pt-2 border-t border-white/10">
                  <span>Estimated Total</span>
                  <span className="text-gold-gradient font-bold">{BRAND.currencySymbol} {total}</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-2 pt-1">
                <button
                  onClick={() => {
                    onClose();
                    onProceedToCheckout();
                  }}
                  className="w-full py-3.5 px-6 rounded-full bg-[#D4AF37] hover:bg-white text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_25px_rgba(212,175,55,0.35)] transition-all flex items-center justify-center gap-2"
                >
                  <span>Proceed to Checkout</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={onClose}
                  className="w-full py-2.5 text-xs text-[#8e857b] hover:text-[#F5F5F0] uppercase tracking-wider transition-colors"
                >
                  Continue Shopping
                </button>
              </div>

            </div>
          )}

        </div>
      </div>
    </div>
  );
};

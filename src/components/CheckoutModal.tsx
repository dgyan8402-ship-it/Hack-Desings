import React, { useState } from 'react';
import { X, ShieldCheck, CheckCircle2, ShoppingBag, CreditCard, Smartphone, Truck, Sparkles, MessageSquare, ArrowLeft } from 'lucide-react';
import confetti from 'canvas-confetti';
import { CartItem, CheckoutFormData } from '../types';
import { BRAND } from '../data/brand';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  subtotal: number;
  discountAmount: number;
  giftWrapping: boolean;
  onOrderCompleted: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartItems,
  subtotal,
  discountAmount,
  giftWrapping,
  onOrderCompleted
}) => {
  const [step, setStep] = useState<'form' | 'success'>('form');
  const [orderNumber, setOrderNumber] = useState<string>('');
  
  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: 'Accra',
    region: 'Greater Accra',
    deliveryMethod: 'standard',
    paymentMethod: 'momo',
    momoNetwork: 'MTN',
    momoNumber: '',
    orderNotes: '',
    giftWrapping: giftWrapping,
    giftMessage: ''
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isProcessing, setIsProcessing] = useState(false);

  if (!isOpen) return null;

  const giftWrapFee = giftWrapping ? 15 : 0;
  const isFreeShipping = subtotal >= 250;
  const deliveryFee = subtotal === 0 ? 0 : isFreeShipping ? 0 : 25;
  const total = Math.max(0, subtotal - discountAmount + giftWrapFee + deliveryFee);

  const validateForm = () => {
    const errs: Partial<Record<keyof CheckoutFormData, string>> = {};
    if (!formData.fullName.trim()) errs.fullName = 'Please enter your full name';
    if (!formData.phone.trim()) errs.phone = 'Please enter your phone number';
    if (!formData.address.trim()) errs.address = 'Please enter your delivery address';
    if (formData.paymentMethod === 'momo' && !formData.momoNumber?.trim()) {
      errs.momoNumber = 'Please enter your Mobile Money number';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      const generatedOrderNum = `ELR-${Math.floor(100000 + Math.random() * 900000)}`;
      setOrderNumber(generatedOrderNum);
      setStep('success');

      // Trigger confetti celebration
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#dfba82', '#c29553', '#e2a89b', '#ffffff']
        });
      } catch (err) {
        // Fallback gracefully
      }

      onOrderCompleted();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 lg:p-8">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-4xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] shadow-2xl overflow-hidden z-10 max-h-[92vh] flex flex-col my-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02] backdrop-blur-md sticky top-0 z-20">
          <div className="flex items-center gap-2">
            <span className="font-display text-base font-bold tracking-[0.2em] text-[#D4AF37]">
              {BRAND.name}
            </span>
            <span className="text-[#6b6257]">•</span>
            <span className="text-xs text-[#b8afa3] font-serif">
              {step === 'form' ? 'Artisanal Delivery & Checkout' : 'Order Confirmed'}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-[#8e857b] hover:text-[#F5F5F0] transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="overflow-y-auto p-6 sm:p-8 space-y-8">
          
          {step === 'form' ? (
            <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8">
              
              {/* Left Column: Delivery & Payment Details (7 Cols) */}
              <div className="lg:col-span-7 space-y-6">
                
                {/* Notice banner */}
                <div className="p-4 rounded-2xl glass-panel-dark border border-[#D4AF37]/30 flex items-start gap-3 text-xs text-[#e5d4b9]">
                  <Sparkles className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="font-semibold text-[#F5F5F0]">Concierge Checkout Preview:</span>{' '}
                    Orders are hand-packaged with custom signature seal & velvet ribbons.
                  </div>
                </div>

                {/* Section 1: Customer & Delivery Info */}
                <div className="space-y-4">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
                    1. Recipient & Delivery Address
                  </h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#b8afa3] block mb-1">Full Name *</label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        placeholder="e.g. Nana Ama Osei"
                        className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none ${
                          errors.fullName ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.fullName && <p className="text-[10px] text-red-400 mt-1">{errors.fullName}</p>}
                    </div>

                    <div>
                      <label className="text-xs text-[#b8afa3] block mb-1">Phone Number (WhatsApp) *</label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 024 123 4567"
                        className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none ${
                          errors.phone ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                        }`}
                      />
                      {errors.phone && <p className="text-[10px] text-red-400 mt-1">{errors.phone}</p>}
                    </div>
                  </div>

                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">Email (For Order Dispatch Updates)</label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. nama@example.com"
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>

                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">Delivery Address & Landmark *</label>
                    <input
                      type="text"
                      value={formData.address}
                      onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                      placeholder="Street, House Number, or Landmark (e.g. East Legon, Near ANC Mall)"
                      className={`w-full bg-black/40 border rounded-xl px-3.5 py-2.5 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none ${
                        errors.address ? 'border-red-500' : 'border-white/10 focus:border-[#D4AF37]'
                      }`}
                    />
                    {errors.address && <p className="text-[10px] text-red-400 mt-1">{errors.address}</p>}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="text-xs text-[#b8afa3] block mb-1">City / Town</label>
                      <input
                        type="text"
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F5F0] focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-[#b8afa3] block mb-1">Region</label>
                      <select
                        value={formData.region}
                        onChange={(e) => setFormData({ ...formData, region: e.target.value })}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2.5 text-xs text-[#F5F5F0] focus:outline-none"
                      >
                        <option value="Greater Accra" className="bg-[#121212] text-[#F5F5F0]">Greater Accra</option>
                        <option value="Ashanti" className="bg-[#121212] text-[#F5F5F0]">Ashanti (Kumasi)</option>
                        <option value="Western" className="bg-[#121212] text-[#F5F5F0]">Western (Takoradi)</option>
                        <option value="Central" className="bg-[#121212] text-[#F5F5F0]">Central (Cape Coast)</option>
                        <option value="Eastern" className="bg-[#121212] text-[#F5F5F0]">Eastern (Koforidua)</option>
                        <option value="Other" className="bg-[#121212] text-[#F5F5F0]">Other Region / International</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Section 2: Payment Method */}
                <div className="space-y-4 pt-4 border-t border-white/10">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
                    2. Preferred Payment Option
                  </h3>

                  <div className="grid grid-cols-3 gap-3">
                    
                    {/* Mobile Money */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'momo' })}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        formData.paymentMethod === 'momo'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F5F0] ring-1 ring-[#D4AF37] shadow-md'
                          : 'border-white/10 bg-white/5 text-[#a89f92] hover:bg-white/10'
                      }`}
                    >
                      <Smartphone className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                      <div className="text-xs font-semibold">Mobile Money</div>
                      <div className="text-[10px] text-[#8e857b]">MTN / Telecel / AT</div>
                    </button>

                    {/* Card */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'card' })}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        formData.paymentMethod === 'card'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F5F0] ring-1 ring-[#D4AF37] shadow-md'
                          : 'border-white/10 bg-white/5 text-[#a89f92] hover:bg-white/10'
                      }`}
                    >
                      <CreditCard className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                      <div className="text-xs font-semibold">Credit / Debit</div>
                      <div className="text-[10px] text-[#8e857b]">Visa / Mastercard</div>
                    </button>

                    {/* Cash on Delivery */}
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, paymentMethod: 'cod' })}
                      className={`p-3.5 rounded-2xl border text-center transition-all ${
                        formData.paymentMethod === 'cod'
                          ? 'border-[#D4AF37] bg-[#D4AF37]/15 text-[#F5F5F0] ring-1 ring-[#D4AF37] shadow-md'
                          : 'border-white/10 bg-white/5 text-[#a89f92] hover:bg-white/10'
                      }`}
                    >
                      <Truck className="w-5 h-5 mx-auto mb-1 text-[#D4AF37]" />
                      <div className="text-xs font-semibold">Pay On Delivery</div>
                      <div className="text-[10px] text-[#8e857b]">Accra Metro Only</div>
                    </button>
                  </div>

                  {/* MoMo Network and Phone input */}
                  {formData.paymentMethod === 'momo' && (
                    <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 space-y-3">
                      <div className="flex gap-2">
                        {(['MTN', 'Telecel', 'AT'] as const).map((net) => (
                          <button
                            key={net}
                            type="button"
                            onClick={() => setFormData({ ...formData, momoNetwork: net })}
                            className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                              formData.momoNetwork === net
                                ? 'bg-[#D4AF37] text-black'
                                : 'bg-white/5 text-[#8e857b] border border-white/10'
                            }`}
                          >
                            {net} MoMo
                          </button>
                        ))}
                      </div>

                      <div>
                        <label className="text-xs text-[#b8afa3] block mb-1">
                          {formData.momoNetwork} Mobile Money Wallet Number *
                        </label>
                        <input
                          type="tel"
                          value={formData.momoNumber}
                          onChange={(e) => setFormData({ ...formData, momoNumber: e.target.value })}
                          placeholder="e.g. 0244 000 000"
                          className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#F5F5F0] focus:outline-none focus:border-[#D4AF37]"
                        />
                        {errors.momoNumber && <p className="text-[10px] text-red-400 mt-1">{errors.momoNumber}</p>}
                      </div>
                    </div>
                  )}

                  {/* Order notes */}
                  <div>
                    <label className="text-xs text-[#b8afa3] block mb-1">
                      Delivery Instructions or Gift Ribbon Message (Optional)
                    </label>
                    <textarea
                      rows={2}
                      value={formData.orderNotes}
                      onChange={(e) => setFormData({ ...formData, orderNotes: e.target.value })}
                      placeholder="e.g. Please leave package with front concierge, or add handwritten birthday note..."
                      className="w-full bg-black/40 border border-white/10 rounded-xl px-3.5 py-2 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none focus:border-[#D4AF37]"
                    />
                  </div>
                </div>

              </div>

              {/* Right Column: Order Summary & Place Order Button (5 Cols) */}
              <div className="lg:col-span-5 space-y-6">
                
                <div className="p-6 rounded-3xl glass-panel-dark border border-white/10 space-y-5 shadow-xl">
                  <h3 className="text-sm font-semibold uppercase tracking-widest text-[#D4AF37]">
                    Order Summary ({cartItems.reduce((a, b) => a + b.quantity, 0)} Items)
                  </h3>

                  {/* Items List */}
                  <div className="space-y-3 max-h-56 overflow-y-auto pr-1">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex items-center gap-3 text-xs">
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          referrerPolicy="no-referrer"
                          className="w-12 h-12 rounded-lg object-cover bg-black/40"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-serif font-medium text-[#F5F5F0] truncate">{item.product.name}</h4>
                          <span className="text-[11px] text-[#8e857b]">Qty: {item.quantity} • {item.selectedSize}</span>
                        </div>
                        <div className="font-mono text-[#F5F5F0]">
                          {BRAND.currencySymbol} {item.price * item.quantity}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Price Calculations */}
                  <div className="space-y-2 pt-4 border-t border-white/10 text-xs text-[#b8afa3]">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span className="font-mono text-[#F5F5F0]">{BRAND.currencySymbol} {subtotal}</span>
                    </div>

                    {discountAmount > 0 && (
                      <div className="flex justify-between text-emerald-400">
                        <span>Privilege Discount</span>
                        <span className="font-mono">-{BRAND.currencySymbol} {discountAmount}</span>
                      </div>
                    )}

                    {giftWrapping && (
                      <div className="flex justify-between">
                        <span>Gift Packaging</span>
                        <span className="font-mono text-[#F5F5F0]">+{BRAND.currencySymbol} 15</span>
                      </div>
                    )}

                    <div className="flex justify-between">
                      <span>Courier Delivery</span>
                      <span className="font-mono text-[#F5F5F0]">
                        {deliveryFee === 0 ? 'Complimentary' : `${BRAND.currencySymbol} ${deliveryFee}`}
                      </span>
                    </div>

                    <div className="flex justify-between text-lg font-serif font-bold text-[#F5F5F0] pt-2 border-t border-white/10">
                      <span>Total Amount</span>
                      <span className="text-gold-gradient">{BRAND.currencySymbol} {total}</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full py-4 px-6 rounded-full bg-[#D4AF37] hover:bg-white text-black font-bold text-xs uppercase tracking-widest hover:shadow-[0_0_30px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
                  >
                    {isProcessing ? (
                      <span>Preparing Luxury Parcel...</span>
                    ) : (
                      <>
                        <ShieldCheck className="w-4 h-4" />
                        <span>Confirm Order • {BRAND.currencySymbol} {total}</span>
                      </>
                    )}
                  </button>

                  <p className="text-[10px] text-center text-[#8e857b]">
                    🔒 Encrypted 256-bit Scent Concierge checkout. You will receive an immediate SMS & WhatsApp confirmation.
                  </p>
                </div>

              </div>

            </form>
          ) : (
            /* Order Success State */
            <div className="text-center py-10 space-y-6 max-w-xl mx-auto animate-fadeIn">
              
              <div className="w-20 h-20 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/40 flex items-center justify-center mx-auto text-[#D4AF37] shadow-xl">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
                  Order Successfully Placed
                </span>
                <h3 className="text-3xl sm:text-4xl font-serif text-[#F5F5F0]">
                  Thank You for Choosing ÉLORA
                </h3>
                <p className="text-sm text-[#b8afa3]">
                  Your artisanal fragrances are being prepared and sealed by our atelier in Accra.
                </p>
              </div>

              {/* Order Info Card */}
              <div className="p-6 rounded-2xl glass-panel-dark border border-[#D4AF37]/30 text-left space-y-3 shadow-xl">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-[#8e857b]">Order Reference:</span>
                  <span className="font-mono font-bold text-[#D4AF37]">{orderNumber}</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8e857b]">Recipient:</span>
                  <span className="text-[#F5F5F0] font-medium">{formData.fullName} ({formData.phone})</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-[#8e857b]">Delivery Address:</span>
                  <span className="text-[#F5F5F0] text-right">{formData.address}, {formData.city}</span>
                </div>
                <div className="flex justify-between items-center text-xs pt-2 border-t border-white/10">
                  <span className="text-[#8e857b]">Total Paid:</span>
                  <span className="font-serif font-bold text-gold-gradient text-sm">{BRAND.currencySymbol} {total}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col sm:flex-row gap-3 pt-4">
                <a
                  href={`https://wa.me/${BRAND.whatsapp.replace(/[^0-9]/g, '')}?text=Hello%20ÉLORA%20Concierge,%20I%20just%20placed%20order%20${orderNumber}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3.5 px-6 rounded-full bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-2 shadow-md"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span>Chat With Concierge</span>
                </a>

                <button
                  onClick={onClose}
                  className="flex-1 py-3.5 px-6 rounded-full glass-panel-dark border border-white/10 text-[#F5F5F0] hover:border-[#D4AF37] font-semibold text-xs uppercase tracking-wider transition-colors"
                >
                  Return to Boutique
                </button>
              </div>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

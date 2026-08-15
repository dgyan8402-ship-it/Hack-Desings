import React, { useState } from 'react';
import { X, Sparkles, ArrowRight, Check, RotateCcw, Heart, ShoppingBag } from 'lucide-react';
import { Product } from '../types';
import { BRAND } from '../data/brand';

interface ScentFinderModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const ScentFinderModal: React.FC<ScentFinderModalProps> = ({
  isOpen,
  onClose,
  products,
  onAddToCart,
  onQuickView
}) => {
  const [step, setStep] = useState(1);
  const [vibe, setVibe] = useState<string>('');
  const [occasion, setOccasion] = useState<string>('');
  const [format, setFormat] = useState<string>('');

  if (!isOpen) return null;

  const handleReset = () => {
    setStep(1);
    setVibe('');
    setOccasion('');
    setFormat('');
  };

  // Logic to determine best matching product based on answers
  const getMatchedProduct = (): Product => {
    if (format === 'Lotion') {
      return products.find(p => p.category === 'Body Lotions') || products[3];
    }
    if (format === 'Oil') {
      return products.find(p => p.category === 'Fragrance Oils') || products[5];
    }
    if (format === 'Mist') {
      return products.find(p => p.category === 'Body Mists') || products[4];
    }

    if (vibe === 'fresh') {
      return products.find(p => p.fragranceFamily === 'Fresh & Clean') || products[4];
    }
    if (vibe === 'woody') {
      return products.find(p => p.name === 'ÉLORA Oud') || products[2];
    }
    if (vibe === 'floral') {
      return products.find(p => p.name === 'ÉLORA Rose') || products[1];
    }
    // Default sensual noir
    return products.find(p => p.name === 'ÉLORA Noir') || products[0];
  };

  const matchedProduct = getMatchedProduct();

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-[2.5rem] p-6 sm:p-8 shadow-2xl z-10 space-y-6">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-5 h-5 text-[#D4AF37]" />
            <h3 className="font-serif text-xl sm:text-2xl text-[#F5F5F0]">
              Artisanal Scent Matcher
            </h3>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-white/10 text-[#8e857b] hover:text-[#F5F5F0]"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
          <div
            className="bg-[#D4AF37] h-full transition-all duration-500 shadow-[0_0_10px_rgba(212,175,55,0.5)]"
            style={{ width: `${(step / 4) * 100}%` }}
          />
        </div>

        {/* Step 1: Vibe / Aura */}
        {step === 1 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Step 1 of 3
              </span>
              <h4 className="text-xl font-serif text-[#F5F5F0]">
                What aura or presence do you want to project?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'sensual', title: 'Mysterious & Nocturnal', desc: 'Plum, Black Orchid, Smoky Amber', icon: '🌙' },
                { id: 'woody', title: 'Commanding & Regal', desc: 'Rare Agarwood, Spiced Oud, Cedar', icon: '👑' },
                { id: 'floral', title: 'Romantic & Velvety', desc: 'Damask Rose, Lychee, Cashmere', icon: '🌸' },
                { id: 'fresh', title: 'Crisp & Invigorating', desc: 'White Tea, Citrus Bergamot, Morning Dew', icon: '🍃' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setVibe(opt.id);
                    setStep(2);
                  }}
                  className={`p-4 rounded-2xl border text-left transition-all ${
                    vibe === opt.id
                      ? 'border-[#D4AF37] bg-[#D4AF37]/15 ring-1 ring-[#D4AF37]'
                      : 'border-white/10 bg-white/5 hover:border-[#D4AF37]/40 hover:bg-white/10'
                  }`}
                >
                  <div className="text-xl mb-1">{opt.icon}</div>
                  <div className="text-sm font-semibold text-[#F5F5F0]">{opt.title}</div>
                  <div className="text-xs text-[#8e857b] mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 2: Occasion */}
        {step === 2 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Step 2 of 3
              </span>
              <h4 className="text-xl font-serif text-[#F5F5F0]">
                When will you wear this signature blend most?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'everyday', title: 'Daily Signature', desc: 'Seamless luxury for work and casual elegance' },
                { id: 'evening', title: 'Evening Galas & Dates', desc: 'Magnetic projection that commands attention' },
                { id: 'warmdays', title: 'Tropical Sun & Outdoor', desc: 'Uplifting, airy, and breathably fresh' },
                { id: 'selfcare', title: 'Nighttime Relaxation', desc: 'Warm intimate cocoon after a bath' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setOccasion(opt.id);
                    setStep(3);
                  }}
                  className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#D4AF37]/40 hover:bg-white/10 text-left transition-all"
                >
                  <div className="text-sm font-semibold text-[#F5F5F0]">{opt.title}</div>
                  <div className="text-xs text-[#8e857b] mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(1)}
              className="text-xs text-[#8e857b] hover:text-[#F5F5F0] underline pt-2"
            >
              ← Back to previous question
            </button>
          </div>
        )}

        {/* Step 3: Product Format */}
        {step === 3 && (
          <div className="space-y-4 animate-fadeIn">
            <div className="space-y-1">
              <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
                Step 3 of 3
              </span>
              <h4 className="text-xl font-serif text-[#F5F5F0]">
                What fragrance application format suits your routine?
              </h4>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {[
                { id: 'Perfume', title: 'Extrait de Parfum Spray', desc: 'Highest oil concentration (25-30%) with maximum sillage' },
                { id: 'Lotion', title: 'Nourishing Body Lotion', desc: 'Silken shea hydration infused with all-day fragrance' },
                { id: 'Oil', title: 'Pure Attar Perfume Oil', desc: '100% alcohol-free roller for intimate pulse-point warmth' },
                { id: 'Mist', title: 'Refreshing Body Mist', desc: 'Lightweight, cooling fine spray for full-body spritzing' },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFormat(opt.id);
                    setStep(4);
                  }}
                  className="p-4 rounded-2xl border border-white/10 bg-white/5 hover:border-[#D4AF37]/40 hover:bg-white/10 text-left transition-all"
                >
                  <div className="text-sm font-semibold text-[#F5F5F0]">{opt.title}</div>
                  <div className="text-xs text-[#8e857b] mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="text-xs text-[#8e857b] hover:text-[#F5F5F0] underline pt-2"
            >
              ← Back to previous question
            </button>
          </div>
        )}

        {/* Step 4: Result Match */}
        {step === 4 && (
          <div className="space-y-6 text-center animate-fadeIn">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Your Olfactory Match: 99.4% Compatibility</span>
            </div>

            <div className="p-6 rounded-3xl glass-panel-card border border-[#D4AF37]/40 flex flex-col sm:flex-row items-center gap-6 text-left shadow-xl">
              <img
                src={matchedProduct.image}
                alt={matchedProduct.name}
                referrerPolicy="no-referrer"
                className="w-28 h-28 sm:w-36 sm:h-36 rounded-2xl object-cover"
              />

              <div className="flex-1 space-y-2">
                <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono">
                  {matchedProduct.category} • {matchedProduct.fragranceFamily}
                </span>
                <h4 className="text-2xl font-serif text-[#F5F5F0]">{matchedProduct.name}</h4>
                <p className="text-xs text-[#b8afa3] line-clamp-2">{matchedProduct.description}</p>
                <div className="text-lg font-serif font-bold text-gold-gradient">
                  {BRAND.currencySymbol} {matchedProduct.price}
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                onClick={() => {
                  onClose();
                  onQuickView(matchedProduct);
                }}
                className="flex-1 py-3.5 px-4 rounded-full glass-panel-dark border border-white/10 text-xs font-semibold uppercase tracking-wider text-[#F5F5F0] hover:border-[#D4AF37] transition-colors"
              >
                View Full Olfactory Profile
              </button>

              <button
                onClick={() => {
                  onAddToCart(matchedProduct, matchedProduct.sizes[0]?.size || '50ml', 1);
                  onClose();
                }}
                className="flex-1 py-3.5 px-4 rounded-full bg-[#D4AF37] hover:bg-white text-black text-xs font-bold uppercase tracking-wider hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] transition-all flex items-center justify-center gap-2"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Add Scent To Cart</span>
              </button>
            </div>

            <button
              onClick={handleReset}
              className="text-xs text-[#8e857b] hover:text-[#D4AF37] flex items-center justify-center gap-1.5 mx-auto transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Retake Scent Quiz</span>
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

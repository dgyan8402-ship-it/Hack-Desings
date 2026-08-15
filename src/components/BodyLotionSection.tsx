import React from 'react';
import { Product } from '../types';
import { Sparkles, Droplet, Heart, ShoppingBag, ShieldCheck, Sparkle } from 'lucide-react';
import { BRAND } from '../data/brand';

interface BodyLotionSectionProps {
  lotions: Product[];
  onAddToCart: (product: Product, size: string, quantity: number) => void;
  onQuickView: (product: Product) => void;
}

export const BodyLotionSection: React.FC<BodyLotionSectionProps> = ({
  lotions,
  onAddToCart,
  onQuickView
}) => {
  return (
    <section id="body-lotion" className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      
      {/* Soft Ambient Light Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#E2A89B]/[0.08] rounded-full blur-[150px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[450px] h-[450px] bg-[#D4AF37]/[0.06] rounded-full blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#E2A89B]/10 border border-[#E2A89B]/30 text-[#E2A89B] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
            <Droplet className="w-3.5 h-3.5" />
            <span>Velvet Skincare & Fragrance Layering</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-serif font-light text-[#F5F5F0] leading-tight">
            Care For Your Skin. <br />
            <span className="italic text-rose-gold-gradient font-normal">Love Your Scent.</span>
          </h2>

          <p className="text-[#c7beaf] text-sm sm:text-base font-light max-w-2xl mx-auto">
            Formulated with unrefined Ghanaian Shea Butter, botanical squalane, and multi-molecular hyaluronic acid. Our body hydrators deeply replenish your barrier while releasing a delicate all-day fragrance.
          </p>

          {/* Skin Benefits Badges */}
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs text-[#D4AF37]">
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" />
              24H Moisture Barrier
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
              <Sparkle className="w-3.5 h-3.5 text-[#E2A89B]" />
              Non-Greasy Velvet Finish
            </span>
            <span className="px-3.5 py-1 rounded-full bg-white/5 border border-white/10 flex items-center gap-1.5 backdrop-blur-sm">
              <Droplet className="w-3.5 h-3.5 text-[#93c5fd]" />
              Raw Shea Butter & Squalane
            </span>
          </div>
        </div>

        {/* Featured Lotions Showcase */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
          {lotions.map((lotion) => {
            const defaultSize = lotion.sizes[0]?.size || '250ml';
            return (
              <div
                key={lotion.id}
                onClick={() => onQuickView(lotion)}
                className="group rounded-[2rem] overflow-hidden glass-panel-card p-6 sm:p-8 flex flex-col md:flex-row gap-6 sm:gap-8 items-center cursor-pointer transition-all duration-500 hover:-translate-y-1.5 hover:border-[#E2A89B]/40 hover:shadow-[0_25px_50px_rgba(0,0,0,0.6),0_0_30px_rgba(226,168,155,0.15)] shadow-2xl"
              >
                {/* Lotion Product Image */}
                <div className="relative w-full md:w-5/12 aspect-square rounded-2xl overflow-hidden bg-[#141414] flex-shrink-0">
                  <img
                    src={lotion.image}
                    alt={lotion.name}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover object-center transform group-hover:scale-108 transition-transform duration-700 filter brightness-95 group-hover:brightness-105"
                  />
                  <div className="absolute top-3 left-3 px-3 py-0.5 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase font-bold text-[#E2A89B] border border-white/10">
                    Skincare Ritual
                  </div>
                </div>

                {/* Lotion Details & Benefit List */}
                <div className="flex-1 flex flex-col justify-between h-full space-y-4 text-left">
                  
                  <div className="space-y-1.5">
                    <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
                      {lotion.subtitle}
                    </div>

                    <h3 className="text-2xl font-serif text-[#F5F5F0] group-hover:text-[#E2A89B] transition-colors">
                      {lotion.name}
                    </h3>

                    <p className="text-xs sm:text-sm text-[#b8afa3] line-clamp-2 font-light leading-relaxed">
                      {lotion.description}
                    </p>
                  </div>

                  {/* Bullet Benefits */}
                  {lotion.benefits && (
                    <div className="space-y-1.5 py-1">
                      {lotion.benefits.slice(0, 2).map((benefit, idx) => (
                        <div key={idx} className="flex items-start gap-2 text-xs text-[#d8cfc4]">
                          <span className="text-[#E2A89B] mt-0.5">✦</span>
                          <span>{benefit}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Pricing and Action */}
                  <div className="pt-3 border-t border-white/10 flex items-center justify-between gap-4">
                    <div>
                      <span className="text-[10px] text-[#8e857b] uppercase tracking-wider block">
                        {defaultSize}
                      </span>
                      <span className="text-xl font-serif font-bold text-[#F5F5F0]">
                        {BRAND.currencySymbol} {lotion.price}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onAddToCart(lotion, defaultSize, 1);
                        }}
                        className="px-5 py-2.5 rounded-full bg-[#D4AF37] hover:bg-white text-black text-xs font-bold uppercase tracking-wider hover:shadow-lg transition-all flex items-center gap-1.5 shadow-md shadow-[#D4AF37]/15"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Add To Cart</span>
                      </button>
                    </div>

                  </div>

                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

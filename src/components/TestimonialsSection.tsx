import React from 'react';
import { Star, Sparkles, Quote, CheckCircle } from 'lucide-react';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="py-24 bg-transparent relative overflow-hidden border-t border-white/10">
      
      {/* Soft Ambient Background Glow */}
      <div className="absolute top-1/2 left-1/3 w-[600px] h-[350px] bg-[#D4AF37]/[0.04] blur-[150px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Patron Experiences</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#F5F5F0]">
            Loved By <span className="italic text-gold-gradient font-normal">Discerning Scent Lovers</span>
          </h2>

          <p className="text-[#b8afa3] text-sm sm:text-base font-light">
            Read verified impressions from individuals who have made ÉLORA an essential part of their signature presence.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <div
              key={item.id}
              className={`p-6 sm:p-7 rounded-[2rem] glass-panel-card border border-white/10 flex flex-col justify-between space-y-6 hover:border-[#D4AF37]/40 transition-all duration-500 hover:-translate-y-1.5 shadow-xl ${
                idx % 2 === 1 ? 'lg:translate-y-4' : ''
              }`}
            >
              {/* Top Quote & Rating */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex text-[#D4AF37]">
                    {[...Array(item.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#D4AF37]" />
                    ))}
                  </div>
                  <Quote className="w-6 h-6 text-[#D4AF37]/30" />
                </div>

                <p className="text-xs sm:text-sm text-[#d8cfc4] font-light leading-relaxed italic">
                  "{item.review}"
                </p>
              </div>

              {/* Bottom Customer Info */}
              <div className="pt-4 border-t border-white/10 space-y-2">
                <div className="flex items-center gap-3">
                  <img
                    src={item.avatar}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-10 h-10 rounded-full object-cover border border-[#D4AF37]/40"
                  />
                  <div>
                    <div className="text-xs font-semibold text-[#F5F5F0] flex items-center gap-1.5">
                      <span>{item.name}</span>
                      {item.verified && (
                        <CheckCircle className="w-3 h-3 text-[#D4AF37]" title="Verified Patron" />
                      )}
                    </div>
                    <div className="text-[10px] text-[#8e857b]">{item.location}</div>
                  </div>
                </div>

                {/* Scent Tag */}
                <div className="flex items-center justify-between text-[10px] text-[#D4AF37] bg-white/[0.04] px-3 py-1 rounded-full border border-white/5">
                  <span>{item.productName}</span>
                  <span className="text-[#8e857b] font-mono">{item.favoriteNote}</span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

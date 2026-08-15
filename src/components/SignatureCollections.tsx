import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';
import { SCENT_COLLECTIONS } from '../data/collections';
import { FragranceFamily } from '../types';

interface SignatureCollectionsProps {
  onSelectFamily: (family: FragranceFamily) => void;
}

export const SignatureCollections: React.FC<SignatureCollectionsProps> = ({ onSelectFamily }) => {
  return (
    <section id="signature-collections" className="py-20 bg-transparent relative overflow-hidden border-y border-white/10">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#D4AF37]/[0.05] blur-[140px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Curated Olfactory Journeys</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#F5F5F0] tracking-tight">
            Find Your <span className="italic text-gold-gradient font-normal">Signature Scent</span>
          </h2>

          <p className="text-[#b8afa3] text-sm sm:text-base font-light">
            Every personality has a scent signature. Explore our four master fragrance families designed for different moods, atmospheres, and expressions.
          </p>
        </div>

        {/* 4-Collection Bento Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {SCENT_COLLECTIONS.map((col) => (
            <div
              key={col.id}
              onClick={() => {
                onSelectFamily(col.family);
                const shopEl = document.querySelector('#shop');
                if (shopEl) {
                  shopEl.scrollIntoView({ behavior: 'smooth' });
                }
              }}
              className="group cursor-pointer rounded-[2rem] overflow-hidden glass-panel-card relative aspect-[3/4] flex flex-col justify-end p-6 transition-all duration-500 hover:-translate-y-2 hover:border-[#D4AF37]/40 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6),0_0_30px_rgba(212,175,55,0.15)] shadow-xl"
            >
              {/* Background Image */}
              <div className="absolute inset-0 z-0 overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform transition-transform duration-700 group-hover:scale-110 filter brightness-90 group-hover:brightness-100"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent" />
                <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-300" />
              </div>

              {/* Mood Badge */}
              <div className="absolute top-4 left-4 z-10">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[10px] uppercase tracking-wider text-[#F5F5F0] border border-white/10 font-medium">
                  {col.family}
                </span>
              </div>

              {/* Card Bottom Details */}
              <div className="relative z-10 space-y-2">
                <div className="text-[11px] text-[#D4AF37] font-mono tracking-wider">
                  {col.tagline}
                </div>

                <h3 className="text-xl sm:text-2xl font-serif text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                  {col.title}
                </h3>

                <p className="text-xs text-[#b8afa3] line-clamp-2 font-light leading-relaxed">
                  {col.description}
                </p>

                <div className="pt-2 flex items-center gap-2 text-xs font-semibold text-[#D4AF37] group-hover:text-white transition-colors uppercase tracking-wider">
                  <span>Explore Collection</span>
                  <ArrowRight className="w-3.5 h-3.5 transform group-hover:translate-x-1.5 transition-transform" />
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

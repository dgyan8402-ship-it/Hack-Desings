import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Award, Leaf, Shield, HeartHandshake } from 'lucide-react';
import { BRAND } from '../data/brand';

export const AboutSection: React.FC = () => {
  const [inView, setInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  // Animated counters
  const [customersCount, setCustomersCount] = useState(0);
  const [productsCount, setProductsCount] = useState(0);
  const [ratingVal, setRatingVal] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 1600;
    const stepTime = 25;
    const steps = duration / stepTime;

    const timer = setInterval(() => {
      start++;
      const progress = start / steps;

      setCustomersCount(Math.round(500 * Math.min(1, progress)));
      setProductsCount(Math.round(50 * Math.min(1, progress)));
      setRatingVal(Number((4.9 * Math.min(1, progress)).toFixed(1)));

      if (start >= steps) {
        clearInterval(timer);
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [inView]);

  return (
    <section
      id="about"
      ref={sectionRef}
      className="py-24 bg-transparent relative overflow-hidden border-t border-white/10"
    >
      {/* Background Ambient Aura */}
      <div className="absolute top-1/3 right-1/4 w-[600px] h-[400px] bg-[#D4AF37]/[0.05] blur-[160px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Atelier Luxury Photo Montage (5 Cols) */}
          <div className="lg:col-span-5 relative">
            
            <div className="relative aspect-[4/5] rounded-[2rem] overflow-hidden glass-panel-card border border-white/15 p-2 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1523293182086-7651a899d37f?auto=format&fit=crop&w=1000&q=80"
                alt="ÉLORA Scents Atelier"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover rounded-[1.75rem] filter brightness-95"
              />
              
              {/* Overlay Glass Tag */}
              <div className="absolute bottom-6 left-6 right-6 glass-panel-dark p-4 rounded-2xl border border-white/15 backdrop-blur-md">
                <div className="text-xs uppercase tracking-widest text-[#D4AF37] font-mono">
                  Master Scent Atelier
                </div>
                <div className="text-base font-serif text-[#F5F5F0] font-medium">
                  Formulated with Rare Botanicals & French Extracts
                </div>
              </div>
            </div>

            {/* Small floating decorative badge */}
            <div className="hidden sm:flex absolute -top-5 -right-5 glass-panel-dark px-4 py-2.5 rounded-full border border-white/20 shadow-xl items-center gap-2.5 animate-float-slow">
              <Sparkles className="w-4 h-4 text-[#D4AF37]" />
              <span className="text-xs font-semibold text-[#F5F5F0]">100% Artisanal Craft</span>
            </div>

          </div>

          {/* Right Column: Story Copy & Animated Statistics (7 Cols) */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[#D4AF37] text-xs uppercase tracking-[0.25em] font-medium backdrop-blur-md">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Our Heritage & Philosophy</span>
              </div>

              <h2 className="text-3xl sm:text-4xl md:text-5xl font-serif font-light text-[#F5F5F0] leading-tight">
                Crafting Scents That Mirror <br />
                <span className="italic text-gold-gradient font-normal">Your Innate Elegance</span>
              </h2>

              <p className="text-sm sm:text-base text-[#c7beaf] font-light leading-relaxed">
                At {BRAND.name}, we believe fragrance is not merely an accessory—it is an invisible signature that lingers long after you leave a room. Founded with a vision to marry historic Grasse perfumery traditions with rich indigenous botanicals like raw unrefined Ghanaian Shea Butter, our creations elevate everyday rituals into timeless memories.
              </p>

              <p className="text-sm sm:text-base text-[#a89f92] font-light leading-relaxed">
                Whether you seek the intoxicating nocturnal magnetism of <em>ÉLORA Noir</em>, the velvety nourishment of our body hydrators, or the intimate warmth of pure attar oils, every formula is blended in small artisanal batches to ensure unforgettable sillage.
              </p>
            </div>

            {/* Brand Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 text-left space-y-1.5 shadow-md">
                <Leaf className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F5F0]">Pure Botanicals</h4>
                <p className="text-[11px] text-[#8e857b]">Unrefined shea butter & ethically sourced oils.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 text-left space-y-1.5 shadow-md">
                <Award className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F5F0]">Extrait Sillage</h4>
                <p className="text-[11px] text-[#8e857b]">Up to 30% oil concentration for 18+ hours.</p>
              </div>

              <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 text-left space-y-1.5 shadow-md">
                <HeartHandshake className="w-5 h-5 text-[#D4AF37]" />
                <h4 className="text-xs font-semibold uppercase tracking-wider text-[#F5F5F0]">Concierge Care</h4>
                <p className="text-[11px] text-[#8e857b]">Personalized scent consulting & gift ribboning.</p>
              </div>
            </div>

            {/* Animated Statistics Area */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-3 gap-4 sm:gap-8">
              
              <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 text-center shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gold-gradient">
                  {customersCount}+
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#b8afa3] mt-1 font-medium">
                  Happy Patrons
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 text-center shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gold-gradient">
                  {productsCount}+
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#b8afa3] mt-1 font-medium">
                  Artisanal Formulations
                </div>
              </div>

              <div className="p-4 rounded-2xl glass-panel-dark border border-white/10 text-center shadow-lg">
                <div className="text-2xl sm:text-3xl md:text-4xl font-serif font-bold text-gold-gradient">
                  {ratingVal}/5
                </div>
                <div className="text-[11px] uppercase tracking-wider text-[#b8afa3] mt-1 font-medium">
                  Average Rating
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
};

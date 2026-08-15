import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, Clock, Droplets, Compass } from 'lucide-react';
import { BRAND } from '../data/brand';

interface HeroProps {
  onShopClick: () => void;
  onExploreFragrancesClick: () => void;
  onOpenQuiz: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onShopClick,
  onExploreFragrancesClick,
  onOpenQuiz
}) => {
  return (
    <section id="hero" className="relative min-h-[90vh] lg:min-h-[95vh] flex items-center justify-center overflow-hidden pt-8 pb-16 lg:py-24">
      
      {/* Background Animated Gradient Orbs & Ambient Aura */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Warm Golden Glow Orb */}
        <div 
          className="absolute top-1/4 left-1/4 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[550px] h-[350px] sm:h-[550px] rounded-full bg-[#D4AF37]/10 blur-[130px] animate-pulse-glow"
        />
        {/* Soft Amber Glow Orb */}
        <div 
          className="absolute bottom-1/4 right-1/4 translate-x-1/3 translate-y-1/3 w-[320px] sm:w-[500px] h-[320px] sm:h-[500px] rounded-full bg-[#F27D26]/[0.06] blur-[150px] animate-pulse-glow"
          style={{ animationDelay: '3s' }}
        />
        {/* Center Deep Smoky Charcoal Tone */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(20,20,20,0.4)_0%,rgba(10,10,10,0.95)_100%)]" />

        {/* Subtle Floating Fragrance Light Motes / Particles */}
        <div className="absolute inset-0 opacity-40">
          <div className="absolute top-[15%] left-[20%] w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-float-slow" style={{ animationDuration: '8s' }} />
          <div className="absolute top-[35%] right-[25%] w-2 h-2 rounded-full bg-[#F5E6C8] animate-float-slow" style={{ animationDuration: '11s', animationDelay: '1s' }} />
          <div className="absolute bottom-[25%] left-[30%] w-1.5 h-1.5 rounded-full bg-[#E2A89B] animate-float-slow" style={{ animationDuration: '9s', animationDelay: '2.5s' }} />
          <div className="absolute top-[60%] right-[15%] w-1 h-1 rounded-full bg-[#D4AF37] animate-float-slow" style={{ animationDuration: '14s', animationDelay: '3.5s' }} />
          <div className="absolute top-[20%] right-[40%] w-2 h-2 rounded-full bg-[#D4AF37]/60 animate-float-slow" style={{ animationDuration: '10s', animationDelay: '4s' }} />
        </div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          
          {/* Left Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 text-center lg:text-left space-y-6 sm:space-y-8">
            
            {/* Top Brand Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/[0.05] border border-white/10 backdrop-blur-xl shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-[#D4AF37]" />
              <span className="text-xs uppercase tracking-[0.25em] text-[#e5d4b9] font-medium">
                Haute Parfumerie & Velvet Body Care
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-serif font-light text-[#F5F5F0] leading-[1.12] tracking-tight">
              Your Signature <br />
              <span className="italic font-normal text-gold-gradient">Scent Starts Here.</span>
            </h1>

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-[#c7beaf] font-light max-w-2xl mx-auto lg:mx-0 leading-relaxed">
              {BRAND.subheadline}
            </p>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
              
              {/* Primary CTA */}
              <button
                onClick={onShopClick}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#D4AF37] text-black font-semibold text-sm sm:text-base tracking-widest uppercase hover:bg-white transition-all duration-300 transform hover:-translate-y-1 shadow-lg shadow-[#D4AF37]/20 flex items-center justify-center gap-2.5 group"
              >
                <span>Shop Collection</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </button>

              {/* Secondary CTA */}
              <button
                onClick={onExploreFragrancesClick}
                className="w-full sm:w-auto px-7 py-4 rounded-full glass-panel-dark border border-white/20 text-[#F5F5F0] hover:text-[#D4AF37] hover:border-[#D4AF37]/50 hover:bg-white/[0.08] font-medium text-sm sm:text-base tracking-widest uppercase transition-all duration-300 flex items-center justify-center gap-2"
              >
                <Compass className="w-4 h-4 text-[#D4AF37]" />
                <span>Explore Fragrances</span>
              </button>

            </div>

            {/* Scent Quiz Mini Link */}
            <div className="pt-2 flex items-center justify-center lg:justify-start gap-2 text-xs text-[#a89f92]">
              <span>Unsure of your match?</span>
              <button
                onClick={onOpenQuiz}
                className="text-[#D4AF37] hover:text-white underline font-medium cursor-pointer transition-colors"
              >
                Take the 60-Second Scent Quiz →
              </button>
            </div>

            {/* Trust Badges */}
            <div className="pt-6 sm:pt-8 border-t border-white/10 grid grid-cols-3 gap-4 max-w-lg mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5 text-left">
                <Clock className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#F5F5F0]">18+ Hours</div>
                  <div className="text-[10px] text-[#8e857b]">Long-Lasting</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <Droplets className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#F5F5F0]">30% Extrait</div>
                  <div className="text-[10px] text-[#8e857b]">Pure Essence</div>
                </div>
              </div>

              <div className="flex items-center gap-2.5 text-left">
                <ShieldCheck className="w-4 h-4 text-[#D4AF37] flex-shrink-0" />
                <div>
                  <div className="text-xs font-semibold text-[#F5F5F0]">100% Clean</div>
                  <div className="text-[10px] text-[#8e857b]">Cruelty-Free</div>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Hero Luxury Glass Showcase Bottle */}
          <div className="lg:col-span-5 relative flex items-center justify-center">
            
            {/* Outer Subtle Glowing Ring */}
            <div className="relative w-full max-w-md aspect-[4/5] rounded-[2rem] overflow-hidden glass-panel-card p-4 sm:p-6 flex flex-col justify-between group shadow-2xl">
              
              {/* Product Background Image */}
              <div className="absolute inset-0 z-0">
                <img
                  src="https://images.unsplash.com/photo-1594035910387-fea47794261f?auto=format&fit=crop&w=1200&q=85"
                  alt="ÉLORA Noir Extrait de Parfum"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover object-center transform group-hover:scale-105 transition-transform duration-700 filter brightness-95"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/40 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-r from-[#0A0A0A]/60 via-transparent to-transparent" />
              </div>

              {/* Floating Top Badge */}
              <div className="relative z-10 flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-black/60 backdrop-blur-md text-[11px] font-semibold text-[#D4AF37] border border-white/10 uppercase tracking-widest">
                  Signature Edition
                </span>
                <span className="px-2.5 py-1 rounded-full bg-white/10 backdrop-blur-md text-[11px] text-[#F5F5F0] font-mono">
                  Extrait de Parfum
                </span>
              </div>

              {/* Center Scent Notes Floating Pills */}
              <div className="relative z-10 flex flex-wrap gap-1.5 opacity-90 my-auto">
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-[#e5d4b9]">
                  ✨ Black Orchid
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-[#e5d4b9]">
                  🔥 Smoked Amber
                </span>
                <span className="px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-[10px] text-[#e5d4b9]">
                  🍯 Dark Plum
                </span>
              </div>

              {/* Bottom Glass Card Highlight */}
              <div className="relative z-10 glass-panel-dark p-4 rounded-2xl border border-white/15 flex items-center justify-between">
                <div>
                  <div className="text-xs text-[#D4AF37] font-mono uppercase tracking-wider">Iconic Masterpiece</div>
                  <div className="text-lg font-serif font-medium text-[#F5F5F0]">ÉLORA Noir</div>
                  <div className="text-xs text-[#b8afa3]">GH₵ 180 • 50ml Pure Extrait</div>
                </div>

                <button
                  onClick={onShopClick}
                  className="px-4 py-2 rounded-full bg-[#D4AF37] hover:bg-white text-black text-xs font-bold uppercase tracking-wider transition-all transform active:scale-95 shadow-md"
                >
                  View Scent
                </button>
              </div>

            </div>

            {/* Decorative Floating Accent Pill (Bottom-Left) */}
            <div className="hidden sm:flex absolute -bottom-5 -left-6 z-20 glass-panel-dark px-4 py-2.5 rounded-2xl border border-white/15 shadow-xl items-center gap-3 animate-float-slow">
              <div className="w-8 h-8 rounded-full bg-[#D4AF37]/20 flex items-center justify-center text-[#D4AF37] font-serif text-sm">
                ✦
              </div>
              <div className="text-left">
                <div className="text-[11px] font-semibold text-[#F5F5F0]">Artisanal Scent Sillage</div>
                <div className="text-[9px] text-[#8e857b]">Formulated in Grasse & Accra</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

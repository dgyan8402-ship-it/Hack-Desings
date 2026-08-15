import React, { useState } from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2, Instagram, Facebook, Share2 } from 'lucide-react';
import { BRAND } from '../data/brand';
import { ProductCategory } from '../types';

interface FooterProps {
  onSelectCategory: (category: ProductCategory) => void;
  onOpenQuiz: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onSelectCategory, onOpenQuiz }) => {
  const [newsletterEmail, setNewsletterEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim() || !newsletterEmail.includes('@')) return;
    setSubscribed(true);
    setNewsletterEmail('');
  };

  const handleLinkClick = (href: string, category?: ProductCategory) => {
    if (category) onSelectCategory(category);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-black/60 text-[#F5F5F0] border-t border-white/10 pt-16 pb-12 relative overflow-hidden backdrop-blur-xl">
      
      {/* Subtle Bottom Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[200px] bg-[#D4AF37]/[0.04] blur-[180px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 space-y-12">
        
        {/* Newsletter VIP Banner */}
        <div className="p-8 sm:p-10 rounded-[2rem] glass-panel-card border border-white/15 flex flex-col md:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1 text-center md:text-left">
            <span className="text-[11px] uppercase tracking-widest text-[#D4AF37] font-semibold">
              The ÉLORA Society
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif text-[#F5F5F0]">
              Receive 10% Off Your First Scent Ritual
            </h3>
            <p className="text-xs text-[#b8afa3] max-w-md">
              Subscribe to receive private invitations to limited-edition perfume harvests, olfactive stories, and private promotions.
            </p>
          </div>

          <div className="w-full md:w-auto min-w-[320px]">
            {subscribed ? (
              <div className="p-4 rounded-2xl bg-emerald-950/60 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                <span>Welcome! Use code <strong className="font-mono text-[#D4AF37]">ELORA10</strong> at checkout.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
                <input
                  type="email"
                  required
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder="Enter your email..."
                  className="bg-black/40 border border-white/10 rounded-full px-5 py-3 text-xs text-[#F5F5F0] placeholder-[#6b6257] focus:outline-none focus:border-[#D4AF37] flex-1"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-full bg-[#D4AF37] hover:bg-white text-black font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 shadow-md"
                >
                  <span>Join</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </form>
            )}
          </div>
        </div>

        {/* Main Footer Links Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8 lg:gap-10 pt-4">
          
          {/* Brand Info (2 Cols) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex flex-col">
              <span className="font-display text-2xl font-bold tracking-[0.25em] text-[#D4AF37]">
                {BRAND.name}
              </span>
              <span className="text-[10px] uppercase tracking-[0.35em] text-[#8e857b] mt-0.5">
                {BRAND.tagline}
              </span>
            </div>

            <p className="text-xs text-[#a89f92] leading-relaxed max-w-sm">
              Dedicated to the art of fine extrait fragrance blending, pure botanical attars, and velvet skincare formulations for discerning individuals across Ghana and beyond.
            </p>

            <div className="flex items-center gap-3 pt-2">
              <a
                href={BRAND.socials.instagram}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#D4AF37] transition-colors"
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={BRAND.socials.facebook}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#D4AF37] transition-colors"
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4" />
              </a>
              <a
                href={BRAND.socials.tiktok}
                target="_blank"
                rel="noreferrer"
                className="w-9 h-9 rounded-full bg-white/5 hover:bg-white/15 border border-white/10 flex items-center justify-center text-[#D4AF37] transition-colors"
                aria-label="TikTok"
              >
                <Share2 className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              The Maison
            </h4>
            <ul className="space-y-2 text-xs text-[#b8afa3]">
              <li>
                <button onClick={() => handleLinkClick('#hero')} className="hover:text-[#D4AF37] transition-colors">
                  Home
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#about')} className="hover:text-[#D4AF37] transition-colors">
                  Our Story & Heritage
                </button>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-[#D4AF37] transition-colors text-[#D4AF37]">
                  ✨ Scent Matcher Quiz
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#testimonials')} className="hover:text-[#D4AF37] transition-colors">
                  Customer Reviews
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#contact')} className="hover:text-[#D4AF37] transition-colors">
                  Concierge & Contact
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Categories */}
          <div className="space-y-3">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Collections
            </h4>
            <ul className="space-y-2 text-xs text-[#b8afa3]">
              <li>
                <button onClick={() => handleLinkClick('#shop', 'Perfumes')} className="hover:text-[#D4AF37] transition-colors">
                  Extrait de Parfum
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#body-lotion', 'Body Lotions')} className="hover:text-[#D4AF37] transition-colors">
                  Velvet Body Lotions
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#shop', 'Body Mists')} className="hover:text-[#D4AF37] transition-colors">
                  Botanical Body Mists
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#shop', 'Fragrance Oils')} className="hover:text-[#D4AF37] transition-colors">
                  Pure Concentrated Oils
                </button>
              </li>
              <li>
                <button onClick={() => handleLinkClick('#shop', 'Deodorants')} className="hover:text-[#D4AF37] transition-colors">
                  Natural Deodorants
                </button>
              </li>
            </ul>
          </div>

          {/* Boutique Concierge */}
          <div className="space-y-3 text-xs text-[#b8afa3]">
            <h4 className="text-xs uppercase tracking-widest text-[#D4AF37] font-semibold">
              Concierge
            </h4>
            <p className="text-[#8e857b]">{BRAND.address}</p>
            <p className="text-[#F5F5F0]">{BRAND.phone}</p>
            <p className="text-[#D4AF37] font-mono">{BRAND.email}</p>
            <p className="text-[11px] text-[#6b6257]">{BRAND.hours}</p>
          </div>

        </div>

        {/* Bottom Copyright & Guarantee */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#6b6257]">
          <div>
            © {new Date().getFullYear()} {BRAND.name}. All Rights Reserved. Luxury fragrance maison.
          </div>
          <div className="flex items-center gap-4 text-[11px] text-[#8e857b]">
            <span className="flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#D4AF37]" /> Authentic Grasse Blends
            </span>
            <span>•</span>
            <span>Cruelty-Free</span>
            <span>•</span>
            <span>Accra Express Dispatch</span>
          </div>
        </div>

      </div>
    </footer>
  );
};

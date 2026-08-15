import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import { BRAND } from '../data/brand';
import { ProductCategory } from '../types';

interface NavbarProps {
  cartCount: number;
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenSearch: () => void;
  onOpenQuiz: () => void;
  onSelectCategory: (category: ProductCategory) => void;
  activeCategory?: ProductCategory;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenSearch,
  onOpenQuiz,
  onSelectCategory,
  activeCategory
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks: { label: string; href: string; category?: ProductCategory }[] = [
    { label: 'Home', href: '#hero' },
    { label: 'Shop All', href: '#shop', category: 'All' },
    { label: 'Perfumes', href: '#shop', category: 'Perfumes' },
    { label: 'Body Lotion', href: '#body-lotion', category: 'Body Lotions' },
    { label: 'Body Mist', href: '#shop', category: 'Body Mists' },
    { label: 'Fragrance Oils', href: '#shop', category: 'Fragrance Oils' },
    { label: 'Our Story', href: '#about' },
    { label: 'Contact', href: '#contact' }
  ];

  const handleNavClick = (href: string, category?: ProductCategory) => {
    if (category) {
      onSelectCategory(category);
    }
    setMobileMenuOpen(false);
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      {/* Top Luxury Announcement Bar */}
      <div className="bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/10 text-[#F5F5F0] text-[11px] sm:text-xs py-1.5 px-4 text-center tracking-wider font-light flex items-center justify-center gap-2">
        <span className="inline-block w-1.5 h-1.5 rounded-full bg-[#D4AF37] animate-pulse"></span>
        <span>{BRAND.shippingPolicy}</span>
        <span className="hidden md:inline text-[#8e857b]">•</span>
        <span className="hidden md:inline text-[#D4AF37]">Complimentary Fragrance Sample with every order</span>
      </div>

      {/* Main Sticky Navbar */}
      <header
        className={`sticky top-0 z-40 transition-all duration-300 ${
          isScrolled
            ? 'bg-[#0A0A0A]/85 backdrop-blur-2xl border-b border-white/10 py-3.5 shadow-2xl'
            : 'bg-black/40 backdrop-blur-xl border-b border-white/10 py-5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between gap-4">
            
            {/* Mobile Menu Trigger */}
            <div className="flex items-center lg:hidden">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="p-2 text-[#F5F5F0] hover:text-[#D4AF37] transition-colors focus:outline-none"
                aria-label="Open Navigation Menu"
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <button
                onClick={onOpenSearch}
                className="p-2 text-[#F5F5F0] hover:text-[#D4AF37] transition-colors focus:outline-none ml-1"
                aria-label="Search"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>

            {/* Brand Logo & Tagline */}
            <div className="flex-1 lg:flex-initial text-center lg:text-left">
              <a
                href="#hero"
                onClick={(e) => {
                  e.preventDefault();
                  handleNavClick('#hero');
                }}
                className="inline-flex flex-col items-center lg:items-start group"
              >
                <div className="flex items-center gap-1.5">
                  <span className="font-display text-xl sm:text-2xl md:text-[26px] font-bold tracking-[0.25em] text-[#F5F5F0] group-hover:text-[#D4AF37] transition-colors">
                    {BRAND.name}
                  </span>
                </div>
                <span className="text-[9px] uppercase tracking-[0.35em] text-[#D4AF37] -mt-1 font-medium hidden sm:block">
                  Haute Parfumerie & Skincare
                </span>
              </a>
            </div>

            {/* Desktop Navigation Links */}
            <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.label}
                  onClick={() => handleNavClick(link.href, link.category)}
                  className={`text-[13px] tracking-[0.12em] uppercase transition-colors relative py-1 ${
                    link.category && activeCategory === link.category
                      ? 'text-[#D4AF37] font-semibold'
                      : 'text-[#d8cfc4] hover:text-[#D4AF37]'
                  }`}
                >
                  {link.label}
                  {link.category && activeCategory === link.category && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#D4AF37] rounded-full"></span>
                  )}
                </button>
              ))}
            </nav>

            {/* Right Action Icons & Scent Matcher */}
            <div className="flex items-center gap-2 sm:gap-3.5">
              
              {/* Scent Quiz Pill Button */}
              <button
                onClick={onOpenQuiz}
                className="hidden xl:flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-medium tracking-wide transition-all shadow-sm group hover:scale-[1.02] backdrop-blur-md"
                title="Interactive Scent Matcher Quiz"
              >
                <Sparkles className="w-3.5 h-3.5 group-hover:rotate-12 transition-transform text-[#D4AF37] group-hover:text-black" />
                <span>Scent Matcher</span>
              </button>

              {/* Search Button (Desktop) */}
              <button
                onClick={onOpenSearch}
                className="hidden lg:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 hover:bg-white/10 border border-white/10 text-xs text-[#b8afa3] hover:text-[#F5F5F0] transition-all backdrop-blur-md"
                aria-label="Search Fragrances"
              >
                <Search className="w-3.5 h-3.5 text-[#D4AF37]" />
                <span>Search...</span>
                <kbd className="text-[10px] bg-black/40 px-1.5 py-0.5 rounded text-[#8e857b] border border-white/5">⌘K</kbd>
              </button>

              {/* Wishlist Button */}
              <button
                onClick={onOpenWishlist}
                className="relative p-2.5 rounded-full hover:bg-white/5 text-[#F5F5F0] hover:text-[#E2A89B] transition-colors focus:outline-none"
                aria-label={`Wishlist (${wishlistCount} items)`}
              >
                <Heart className={`w-5 h-5 ${wishlistCount > 0 ? 'fill-[#E2A89B] text-[#E2A89B]' : ''}`} />
                {wishlistCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-[#E2A89B] text-black text-[10px] font-bold rounded-full flex items-center justify-center">
                    {wishlistCount}
                  </span>
                )}
              </button>

              {/* Shopping Bag Button */}
              <button
                onClick={onOpenCart}
                className="relative p-2.5 rounded-full bg-[#D4AF37]/15 hover:bg-[#D4AF37] hover:text-black border border-[#D4AF37]/30 text-[#D4AF37] transition-all focus:outline-none shadow-sm group backdrop-blur-md"
                aria-label={`Shopping Cart (${cartCount} items)`}
              >
                <ShoppingBag className="w-5 h-5 group-hover:scale-110 transition-transform" />
                {cartCount > 0 && (
                  <span className="absolute -top-1 -right-1 min-w-[20px] h-5 px-1 bg-[#D4AF37] text-black text-[11px] font-extrabold rounded-full flex items-center justify-center shadow-md animate-bounce-short">
                    {cartCount}
                  </span>
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Slide-Out Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Drawer Content */}
          <div className="fixed inset-y-0 left-0 max-w-xs w-full bg-[#0A0A0A]/95 backdrop-blur-2xl border-r border-white/10 p-6 shadow-2xl flex flex-col justify-between overflow-y-auto">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <div className="flex flex-col">
                  <span className="font-display text-xl font-bold tracking-[0.2em] text-[#F5F5F0]">
                    {BRAND.name}
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.3em] text-[#D4AF37]">
                    Haute Parfumerie
                  </span>
                </div>
                <button
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-2 text-[#8e857b] hover:text-white rounded-lg focus:outline-none"
                  aria-label="Close menu"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              {/* Mobile Scent Quiz CTA */}
              <div className="mt-6">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenQuiz();
                  }}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#D4AF37]/15 border border-[#D4AF37]/30 text-[#D4AF37] text-xs font-semibold flex items-center justify-center gap-2 hover:bg-[#D4AF37] hover:text-black transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>Take Scent Matcher Quiz</span>
                </button>
              </div>

              {/* Mobile Nav Links */}
              <nav className="mt-6 flex flex-col space-y-3">
                {navLinks.map((link) => (
                  <button
                    key={link.label}
                    onClick={() => handleNavClick(link.href, link.category)}
                    className="text-left text-base font-serif tracking-wider text-[#e5d4b9] hover:text-[#D4AF37] py-2 border-b border-white/5 transition-colors flex items-center justify-between"
                  >
                    <span>{link.label}</span>
                    <span className="text-xs text-[#8e857b]">→</span>
                  </button>
                ))}
              </nav>
            </div>

            {/* Mobile Footer info */}
            <div className="pt-6 border-t border-white/10 text-xs text-[#8e857b] space-y-2">
              <div className="flex items-center gap-2 text-[#D4AF37]">
                <PhoneCall className="w-3.5 h-3.5" />
                <a href={`tel:${BRAND.phone}`} className="hover:underline">{BRAND.phone}</a>
              </div>
              <p className="text-[11px] text-[#6b6257]">{BRAND.hours}</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Star, ArrowRight, Sparkles } from 'lucide-react';
import { Product } from '../types';
import { BRAND } from '../data/brand';

interface SearchBarModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onQuickView: (product: Product) => void;
  onAddToCart: (product: Product, size: string, quantity: number) => void;
}

export const SearchBarModal: React.FC<SearchBarModalProps> = ({
  isOpen,
  onClose,
  products,
  onQuickView,
  onAddToCart
}) => {
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 80);
    } else {
      setQuery('');
    }
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        // Trigger toggle externally or handled in App
      }
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const filtered = query.trim() === '' ? [] : products.filter((p) => {
    const q = query.toLowerCase();
    return (
      p.name.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.fragranceFamily.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.topNotes.some(n => n.toLowerCase().includes(q)) ||
      p.heartNotes.some(n => n.toLowerCase().includes(q)) ||
      p.baseNotes.some(n => n.toLowerCase().includes(q))
    );
  });

  const popularSearches = ['Noir', 'Shea Butter', 'Oud', 'Damask Rose', 'Amber Oil', 'Body Mist'];

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-start justify-center pt-16 sm:pt-24 p-4">
      <div className="fixed inset-0 bg-black/75 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-2xl bg-[#0A0A0A]/95 backdrop-blur-2xl border border-white/15 rounded-[2rem] shadow-2xl overflow-hidden z-10 space-y-4">
        
        {/* Search Bar Input */}
        <div className="p-4 sm:p-5 border-b border-white/10 flex items-center gap-3 bg-white/[0.02]">
          <Search className="w-5 h-5 text-[#D4AF37] flex-shrink-0" />
          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search by perfume, notes (e.g. Vanilla, Oud), or category..."
            className="w-full bg-transparent text-sm sm:text-base text-[#F5F5F0] placeholder-[#8e857b] focus:outline-none"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="text-[#8e857b] hover:text-white p-1"
            >
              ✕
            </button>
          )}
          <button
            onClick={onClose}
            className="p-1.5 px-2.5 rounded-full bg-white/5 hover:bg-white/10 text-xs text-[#8e857b] border border-white/10"
          >
            ESC
          </button>
        </div>

        {/* Popular Tags */}
        <div className="px-5 py-2 flex flex-wrap items-center gap-2 text-xs border-b border-white/5">
          <span className="text-[#8e857b]">Trending:</span>
          {popularSearches.map((tag) => (
            <button
              key={tag}
              onClick={() => setQuery(tag)}
              className="px-3 py-1 rounded-full bg-white/5 hover:bg-white/10 text-[#d8cfc4] hover:text-[#D4AF37] transition-colors border border-white/10"
            >
              {tag}
            </button>
          ))}
        </div>

        {/* Results Body */}
        <div className="max-h-[60vh] overflow-y-auto p-5 space-y-3">
          {query.trim() === '' ? (
            <div className="text-center py-10 space-y-2 text-[#8e857b]">
              <Sparkles className="w-6 h-6 mx-auto text-[#D4AF37]/60" />
              <p className="text-xs">Type a keyword, note (e.g. Amber, Rose), or collection name to search.</p>
            </div>
          ) : filtered.length > 0 ? (
            filtered.map((item) => (
              <div
                key={item.id}
                onClick={() => {
                  onClose();
                  onQuickView(item);
                }}
                className="p-3.5 rounded-2xl glass-panel-card border border-white/10 hover:border-[#D4AF37]/40 transition-all flex items-center justify-between gap-4 cursor-pointer group shadow-md"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <img
                    src={item.image}
                    alt={item.name}
                    referrerPolicy="no-referrer"
                    className="w-14 h-14 rounded-xl object-cover bg-black/40 flex-shrink-0"
                  />
                  <div className="min-w-0">
                    <span className="text-[10px] text-[#D4AF37] uppercase tracking-wider font-mono">
                      {item.category} • {item.fragranceFamily}
                    </span>
                    <h4 className="text-sm font-serif font-medium text-[#F5F5F0] group-hover:text-[#D4AF37] truncate">
                      {item.name}
                    </h4>
                    <p className="text-xs text-[#8e857b] line-clamp-1">{item.description}</p>
                  </div>
                </div>

                <div className="text-right flex-shrink-0">
                  <div className="font-serif font-bold text-gold-gradient text-sm">
                    {BRAND.currencySymbol} {item.price}
                  </div>
                  <span className="text-[10px] text-[#8e857b] group-hover:text-[#D4AF37] flex items-center gap-1 justify-end mt-1">
                    View <ArrowRight className="w-3 h-3" />
                  </span>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center py-12 space-y-3">
              <p className="text-sm text-[#F5F5F0] font-serif">No fragrances match "{query}"</p>
              <p className="text-xs text-[#8e857b]">
                Try searching for broader keywords like "perfume", "lotion", "oil", or "floral".
              </p>
              <button
                onClick={() => setQuery('')}
                className="text-xs text-[#D4AF37] underline hover:text-white"
              >
                Clear search query
              </button>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};

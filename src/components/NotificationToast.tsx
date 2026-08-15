import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle, Heart, ShoppingBag, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  type: 'cart' | 'wishlist' | 'info';
  title: string;
  message: string;
  image?: string;
}

interface ToastProps {
  toasts: ToastMessage[];
  onDismiss: (id: string) => void;
  onOpenCart?: () => void;
}

export const NotificationToast: React.FC<ToastProps> = ({ toasts, onDismiss, onOpenCart }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm w-full pointer-events-none px-4 sm:px-0">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.25 }}
            className="pointer-events-auto glass-panel-dark rounded-2xl p-4 shadow-2xl border border-white/15 flex items-center gap-3.5 bg-[#0A0A0A]/95 backdrop-blur-xl"
          >
            {toast.image ? (
              <img
                src={toast.image}
                alt={toast.title}
                className="w-12 h-12 rounded-xl object-cover border border-white/10 flex-shrink-0"
              />
            ) : (
              <div className="w-10 h-10 rounded-full bg-[#D4AF37]/10 border border-[#D4AF37]/30 flex items-center justify-center flex-shrink-0 text-[#D4AF37]">
                {toast.type === 'cart' ? (
                  <ShoppingBag className="w-5 h-5" />
                ) : toast.type === 'wishlist' ? (
                  <Heart className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ) : (
                  <CheckCircle className="w-5 h-5" />
                )}
              </div>
            )}

            <div className="flex-1 min-w-0">
              <h4 className="text-sm font-medium text-[#F5F5F0] truncate flex items-center gap-1.5 font-serif">
                {toast.title}
              </h4>
              <p className="text-xs text-[#b8afa3] line-clamp-1 mt-0.5">{toast.message}</p>
            </div>

            {toast.type === 'cart' && onOpenCart && (
              <button
                onClick={() => {
                  onDismiss(toast.id);
                  onOpenCart();
                }}
                className="text-xs font-semibold text-[#D4AF37] hover:text-white underline uppercase tracking-wider flex-shrink-0 px-1 py-1"
              >
                View
              </button>
            )}

            <button
              onClick={() => onDismiss(toast.id)}
              className="text-[#8e857b] hover:text-[#F5F5F0] p-1 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

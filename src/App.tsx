import React, { useState, useEffect, useMemo } from 'react';
import { Product, CartItem, FilterState, ProductCategory, FragranceFamily } from './types';
import { INITIAL_PRODUCTS } from './data/products';
import { BRAND } from './data/brand';

// Components
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SignatureCollections } from './components/SignatureCollections';
import { ProductGrid } from './components/ProductGrid';
import { BodyLotionSection } from './components/BodyLotionSection';
import { ProductDetailModal } from './components/ProductDetailModal';
import { CartDrawer } from './components/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal';
import { WishlistDrawer } from './components/WishlistDrawer';
import { SearchBarModal } from './components/SearchBarModal';
import { ScentFinderModal } from './components/ScentFinderModal';
import { TestimonialsSection } from './components/TestimonialsSection';
import { AboutSection } from './components/AboutSection';
import { ContactSection } from './components/ContactSection';
import { Footer } from './components/Footer';
import { NotificationToast, ToastMessage } from './components/NotificationToast';

const CART_STORAGE_KEY = 'elora_scents_cart_v1';
const WISHLIST_STORAGE_KEY = 'elora_scents_wishlist_v1';

export default function App() {
  const [products] = useState<Product[]>(INITIAL_PRODUCTS);

  // Cart State with LocalStorage Persistence
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Wishlist State with LocalStorage Persistence
  const [wishlistIds, setWishlistIds] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem(WISHLIST_STORAGE_KEY);
      return saved ? JSON.parse(saved) : ['elora-noir', 'velvet-glow-lotion'];
    } catch {
      return ['elora-noir', 'velvet-glow-lotion'];
    }
  });

  // Filter & Search State
  const [filterState, setFilterState] = useState<FilterState>({
    category: 'All',
    fragranceFamily: 'All',
    priceRange: [0, 300],
    minRating: 0,
    sortBy: 'featured',
    searchQuery: '',
    onlyInStock: true
  });

  // Modals & Drawers
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isQuizOpen, setIsQuizOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  // Discount & Gift wrapping
  const [discountCode, setDiscountCode] = useState<string>('');
  const [discountPercent, setDiscountPercent] = useState<number>(0);
  const [giftWrapping, setGiftWrapping] = useState<boolean>(false);

  // Toasts
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  // Persist cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart to localStorage', e);
    }
  }, [cart]);

  // Persist wishlist to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlistIds));
    } catch (e) {
      console.error('Failed to save wishlist to localStorage', e);
    }
  }, [wishlistIds]);

  // Global Keyboard Shortcuts (Cmd+K for search)
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsSearchOpen(true);
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, []);

  // Helper for adding Toast
  const addToast = (toast: Omit<ToastMessage, 'id'>) => {
    const id = `toast-${Date.now()}-${Math.random()}`;
    const newToast: ToastMessage = { ...toast, id };
    setToasts((prev) => [...prev, newToast]);

    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3800);
  };

  const handleDismissToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Cart operations
  const handleAddToCart = (product: Product, size: string, quantity: number = 1) => {
    const sizeMultiplier = product.sizes.find((s) => s.size === size)?.priceMultiplier || 1;
    const unitPrice = Math.round(product.price * sizeMultiplier);
    const cartItemId = `${product.id}-${size}`;

    setCart((prev) => {
      const existing = prev.find((item) => item.id === cartItemId);
      if (existing) {
        return prev.map((item) =>
          item.id === cartItemId ? { ...item, quantity: item.quantity + quantity } : item
        );
      } else {
        return [
          ...prev,
          {
            id: cartItemId,
            product,
            selectedSize: size,
            price: unitPrice,
            quantity
          }
        ];
      }
    });

    addToast({
      type: 'cart',
      title: 'Added to Scent Bag',
      message: `${quantity}x ${product.name} (${size})`,
      image: product.image
    });
  };

  const handleUpdateCartQuantity = (cartItemId: string, newQuantity: number) => {
    if (newQuantity <= 0) {
      handleRemoveCartItem(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) => (item.id === cartItemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const handleRemoveCartItem = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.id !== cartItemId));
  };

  const handleBuyNow = (product: Product, size: string, quantity: number = 1) => {
    handleAddToCart(product, size, quantity);
    setSelectedProduct(null);
    setIsCheckoutOpen(true);
  };

  // Wishlist operations
  const handleToggleWishlist = (product: Product) => {
    if (wishlistIds.includes(product.id)) {
      setWishlistIds((prev) => prev.filter((id) => id !== product.id));
      addToast({
        type: 'info',
        title: 'Removed from Wishlist',
        message: `${product.name} removed from your saved items.`
      });
    } else {
      setWishlistIds((prev) => [...prev, product.id]);
      addToast({
        type: 'wishlist',
        title: 'Saved to Wishlist',
        message: `${product.name} added to your private collection.`,
        image: product.image
      });
    }
  };

  const handleRemoveWishlist = (productId: string) => {
    setWishlistIds((prev) => prev.filter((id) => id !== productId));
  };

  // Filter Updates
  const handleUpdateFilters = (updates: Partial<FilterState>) => {
    setFilterState((prev) => ({ ...prev, ...updates }));
  };

  const handleResetFilters = () => {
    setFilterState({
      category: 'All',
      fragranceFamily: 'All',
      priceRange: [0, 300],
      minRating: 0,
      sortBy: 'featured',
      searchQuery: '',
      onlyInStock: true
    });
  };

  const handleSelectCategory = (category: ProductCategory) => {
    setFilterState((prev) => ({ ...prev, category }));
  };

  const handleSelectFamily = (family: FragranceFamily) => {
    setFilterState((prev) => ({ ...prev, fragranceFamily: family }));
  };

  // Apply Coupon code (e.g. ELORA10 or WELCOME)
  const handleApplyDiscount = (code: string) => {
    if (code === 'ELORA10' || code === 'WELCOME10') {
      setDiscountCode(code);
      setDiscountPercent(10);
      return true;
    }
    if (code === 'VIP20') {
      setDiscountCode(code);
      setDiscountPercent(20);
      return true;
    }
    return false;
  };

  // Calculate Subtotals & Discounts
  const cartSubtotal = useMemo(() => {
    return cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  }, [cart]);

  const discountAmount = useMemo(() => {
    return Math.round((cartSubtotal * discountPercent) / 100);
  }, [cartSubtotal, discountPercent]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (filterState.category !== 'All' && product.category !== filterState.category) {
          return false;
        }
        // Fragrance Family Filter
        if (filterState.fragranceFamily !== 'All' && product.fragranceFamily !== filterState.fragranceFamily) {
          return false;
        }
        // Price Filter
        if (product.price > filterState.priceRange[1]) {
          return false;
        }
        // Rating Filter
        if (filterState.minRating > 0 && product.rating < filterState.minRating) {
          return false;
        }
        // Search Query Filter
        if (filterState.searchQuery.trim() !== '') {
          const q = filterState.searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(q);
          const matchCategory = product.category.toLowerCase().includes(q);
          const matchFamily = product.fragranceFamily.toLowerCase().includes(q);
          const matchDesc = product.description.toLowerCase().includes(q);
          const matchNotes =
            product.topNotes.some((n) => n.toLowerCase().includes(q)) ||
            product.heartNotes.some((n) => n.toLowerCase().includes(q)) ||
            product.baseNotes.some((n) => n.toLowerCase().includes(q));

          if (!matchName && !matchCategory && !matchFamily && !matchDesc && !matchNotes) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (filterState.sortBy === 'price-asc') return a.price - b.price;
        if (filterState.sortBy === 'price-desc') return b.price - a.price;
        if (filterState.sortBy === 'rating') return b.rating - a.rating;
        if (filterState.sortBy === 'newest') return (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0);
        // default featured
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, filterState]);

  // Lotions subset for dedicated body lotion section
  const lotionProducts = useMemo(() => {
    return products.filter((p) => p.category === 'Body Lotions');
  }, [products]);

  // Wishlisted product objects
  const wishlistedProducts = useMemo(() => {
    return products.filter((p) => wishlistIds.includes(p.id));
  }, [products, wishlistIds]);

  const totalCartCount = useMemo(() => {
    return cart.reduce((acc, it) => acc + it.quantity, 0);
  }, [cart]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-[#F5F5F0] flex flex-col selection:bg-[#D4AF37] selection:text-[#0A0A0A] relative overflow-x-hidden">
      
      {/* Global Ambient Frosted Glass Background Orbs */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full bg-[#D4AF37]/10 blur-[130px] animate-pulse-glow" />
        <div className="absolute top-1/3 -right-32 w-[550px] h-[550px] rounded-full bg-[#F27D26]/[0.06] blur-[150px] animate-pulse-glow" style={{ animationDelay: '4s' }} />
        <div className="absolute -bottom-32 left-1/4 w-[500px] h-[500px] rounded-full bg-[#D4AF37]/[0.08] blur-[140px] animate-pulse-glow" style={{ animationDelay: '2s' }} />
      </div>

      {/* Toast Notifications */}
      <NotificationToast
        toasts={toasts}
        onDismiss={handleDismissToast}
        onOpenCart={() => setIsCartOpen(true)}
      />

      {/* Navigation */}
      <Navbar
        cartCount={totalCartCount}
        wishlistCount={wishlistIds.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenWishlist={() => setIsWishlistOpen(true)}
        onOpenSearch={() => setIsSearchOpen(true)}
        onOpenQuiz={() => setIsQuizOpen(true)}
        onSelectCategory={handleSelectCategory}
        activeCategory={filterState.category}
      />

      <main className="flex-1">
        {/* 1. Hero Section */}
        <Hero
          onShopClick={() => {
            const shopEl = document.querySelector('#shop');
            shopEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onExploreFragrancesClick={() => {
            const collEl = document.querySelector('#signature-collections');
            collEl?.scrollIntoView({ behavior: 'smooth' });
          }}
          onOpenQuiz={() => setIsQuizOpen(true)}
        />

        {/* 2. Signature Collections ("Find Your Signature Scent") */}
        <SignatureCollections onSelectFamily={handleSelectFamily} />

        {/* 3. Product Grid & Filter Section */}
        <ProductGrid
          products={filteredProducts}
          filterState={filterState}
          onUpdateFilters={handleUpdateFilters}
          onResetFilters={handleResetFilters}
          onAddToCart={handleAddToCart}
          onToggleWishlist={handleToggleWishlist}
          wishlistProductIds={wishlistIds}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* 4. Dedicated Body Lotion Section ("Care For Your Skin. Love Your Scent.") */}
        <BodyLotionSection
          lotions={lotionProducts}
          onAddToCart={handleAddToCart}
          onQuickView={(p) => setSelectedProduct(p)}
        />

        {/* 5. Testimonials Section */}
        <TestimonialsSection />

        {/* 6. About Section ("Our Story" & Animated Stats) */}
        <AboutSection />

        {/* 7. Contact Section */}
        <ContactSection />
      </main>

      {/* 8. Footer */}
      <Footer
        onSelectCategory={handleSelectCategory}
        onOpenQuiz={() => setIsQuizOpen(true)}
      />

      {/* Product Detail Modal */}
      <ProductDetailModal
        product={selectedProduct}
        allProducts={products}
        onClose={() => setSelectedProduct(null)}
        onAddToCart={handleAddToCart}
        onBuyNow={handleBuyNow}
        onToggleWishlist={handleToggleWishlist}
        isWishlisted={selectedProduct ? wishlistIds.includes(selectedProduct.id) : false}
        onSelectRelatedProduct={(rel) => setSelectedProduct(rel)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cart}
        onUpdateQuantity={handleUpdateCartQuantity}
        onRemoveItem={handleRemoveCartItem}
        onProceedToCheckout={() => setIsCheckoutOpen(true)}
        discountCode={discountCode}
        onApplyDiscount={handleApplyDiscount}
        discountAmount={discountAmount}
        giftWrapping={giftWrapping}
        onToggleGiftWrapping={setGiftWrapping}
      />

      {/* Wishlist Drawer */}
      <WishlistDrawer
        isOpen={isWishlistOpen}
        onClose={() => setIsWishlistOpen(false)}
        wishlistProducts={wishlistedProducts}
        onRemoveWishlist={handleRemoveWishlist}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      {/* Search Modal */}
      <SearchBarModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        products={products}
        onQuickView={(p) => setSelectedProduct(p)}
        onAddToCart={handleAddToCart}
      />

      {/* Scent Matcher Quiz Modal */}
      <ScentFinderModal
        isOpen={isQuizOpen}
        onClose={() => setIsQuizOpen(false)}
        products={products}
        onAddToCart={handleAddToCart}
        onQuickView={(p) => setSelectedProduct(p)}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        subtotal={cartSubtotal}
        discountAmount={discountAmount}
        giftWrapping={giftWrapping}
        onOrderCompleted={() => {
          setCart([]);
        }}
      />

    </div>
  );
}

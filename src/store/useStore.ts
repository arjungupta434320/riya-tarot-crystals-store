import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Product {
  id: string;
  name: string;
  description: string;
  shortIntention: string;
  price: number;
  salePrice?: number;
  image: string;
  gallery?: string[];
  category: string; // 'Heal Energized Bracelets' | 'Pendants' | 'Gemstones' | 'Clusters'
  subCategory?: string; // 'Mixel Bracelets' | 'Chakra Bracelets' | 'Kundali Bracelets' | 'All Bracelets'
  badge?: string;
  chakra?: string;
  planet?: string;
  zodiac?: string;
  rashi?: string;
  numerologyNumber?: number | string;
  rating: number;
  reviewCount: number;
  benefits: string[];
  energizationSteps?: string[];
  selectedBeadSize?: '8mm' | '10mm';
  hardness?: string;
  origin?: string;
}

export interface KundliDetails {
  fullName: string;
  dob: string;
  tob?: string;
  pob?: string;
  intention?: string;
}

export interface CartItem extends Product {
  quantity: number;
  selectedBeadSize?: '8mm' | '10mm';
  selectedWristSize?: string;
  cartKey?: string;
  kundliDetails?: KundliDetails;
}

export interface Bundle {
  id: string;
  name: string;
  tagline: string;
  image: string;
  items: Product[];
  bundlePrice: number;
  comparePrice: number;
  savings: number;
  badge: string;
}

export interface EnergizationNote {
  name: string;
  dob: string;
  intention: string;
}

export interface ToastMessage {
  id: number;
  message: string;
  type?: 'success' | 'info';
}

interface StoreState {
  cart: CartItem[];
  isCartOpen: boolean;
  activeDrawerTab: 'cart' | 'wishlist';
  wishlist: string[];
  quickViewProduct: Product | null;
  isCheckoutModalOpen: boolean;
  isQuizModalOpen: boolean;
  activePolicyModal: 'privacy' | 'shipping' | 'refunds' | 'terms' | null;
  energizationNote: EnergizationNote;
  appliedCoupon: string | null;
  toast: ToastMessage | null;
  
  addToCart: (product: Product, quantity?: number, beadSize?: '8mm' | '10mm', wristSize?: string, kundliDetails?: KundliDetails) => void;
  addBundleToCart: (bundle: Bundle) => void;
  removeFromCart: (cartKeyOrId: string) => void;
  updateQuantity: (cartKeyOrId: string, quantity: number) => void;
  toggleCart: () => void;
  setDrawerTab: (tab: 'cart' | 'wishlist') => void;
  clearCart: () => void;
  toggleWishlist: (productId: string) => void;
  openQuickView: (product: Product) => void;
  closeQuickView: () => void;
  toggleCheckoutModal: (open?: boolean) => void;
  openQuizModal: () => void;
  closeQuizModal: () => void;
  openPolicyModal: (policy: 'privacy' | 'shipping' | 'refunds' | 'terms') => void;
  closePolicyModal: () => void;
  setEnergizationNote: (note: EnergizationNote) => void;
  applyCoupon: (code: string) => { success: boolean; message: string; discountPercent: number };
  removeCoupon: () => void;
  showToast: (message: string, type?: 'success' | 'info') => void;
  hideToast: () => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      activeDrawerTab: 'cart',
      wishlist: [],
      quickViewProduct: null,
      isCheckoutModalOpen: false,
      isQuizModalOpen: false,
      activePolicyModal: null,
      energizationNote: {
        name: '',
        dob: '',
        intention: ''
      },
      appliedCoupon: null,
      toast: null,

      showToast: (message, type = 'success') => {
        const id = Date.now();
        set({ toast: { id, message, type } });
        setTimeout(() => {
          if (get().toast?.id === id) {
            set({ toast: null });
          }
        }, 3200);
      },

      hideToast: () => set({ toast: null }),

      addToCart: (product, quantity = 1, beadSize = '8mm', wristSize = 'Standard Elastic (6.5" - 7.5")', kundliDetails) =>
        set((state) => {
          const itemKey = kundliDetails ? `${product.id}-${beadSize}-kundli-${Date.now()}` : `${product.id}-${beadSize}`;
          const existing = !kundliDetails && state.cart.find((item) => (item.cartKey || `${item.id}-${item.selectedBeadSize || '8mm'}`) === itemKey);
          
          if (existing) {
            return {
              cart: state.cart.map((item) =>
                (item.cartKey || `${item.id}-${item.selectedBeadSize || '8mm'}`) === itemKey
                  ? { ...item, quantity: item.quantity + quantity }
                  : item
              ),
              isCartOpen: true,
            };
          }

          const newItem: CartItem = {
            ...product,
            quantity,
            selectedBeadSize: beadSize,
            selectedWristSize: wristSize,
            cartKey: itemKey,
            kundliDetails,
          };

          return { cart: [...state.cart, newItem], isCartOpen: true };
        }),

      addBundleToCart: (bundle) =>
        set((state) => {
          // Add each item in the bundle or a single bundled item
          const newItems: CartItem[] = bundle.items.map((prod) => {
            const proportionalPrice = Math.round(bundle.bundlePrice / bundle.items.length);
            const itemKey = `${prod.id}-bundle-${bundle.id}`;
            return {
              ...prod,
              salePrice: proportionalPrice,
              quantity: 1,
              selectedBeadSize: '8mm',
              selectedWristSize: 'Standard Elastic (6.5" - 7.5")',
              cartKey: itemKey
            };
          });

          // Merge into cart
          return {
            cart: [...state.cart, ...newItems],
            isCartOpen: true
          };
        }),

      removeFromCart: (cartKeyOrId) =>
        set((state) => ({
          cart: state.cart.filter((item) => item.cartKey !== cartKeyOrId && item.id !== cartKeyOrId),
        })),

      updateQuantity: (cartKeyOrId, quantity) =>
        set((state) => {
          if (quantity <= 0) {
            return {
              cart: state.cart.filter((item) => item.cartKey !== cartKeyOrId && item.id !== cartKeyOrId),
            };
          }
          return {
            cart: state.cart.map((item) =>
              item.cartKey === cartKeyOrId || item.id === cartKeyOrId
                ? { ...item, quantity }
                : item
            ),
          };
        }),

      toggleCart: () => set((state) => ({ isCartOpen: !state.isCartOpen })),
      setDrawerTab: (tab) => set({ activeDrawerTab: tab }),
      clearCart: () => set({ cart: [] }),

      toggleWishlist: (productId) =>
        set((state) => {
          if (state.wishlist.includes(productId)) {
            return { wishlist: state.wishlist.filter((id) => id !== productId) };
          }
          return { wishlist: [...state.wishlist, productId] };
        }),

      openQuickView: (product) => set({ quickViewProduct: product }),
      closeQuickView: () => set({ quickViewProduct: null }),

      toggleCheckoutModal: (open) =>
        set((state) => ({
          isCheckoutModalOpen: open !== undefined ? open : !state.isCheckoutModalOpen,
          isCartOpen: open ? false : state.isCartOpen
        })),

      openQuizModal: () => set({ isQuizModalOpen: true }),
      closeQuizModal: () => set({ isQuizModalOpen: false }),

      openPolicyModal: (policy) => set({ activePolicyModal: policy }),
      closePolicyModal: () => set({ activePolicyModal: null }),

      setEnergizationNote: (note) => set({ energizationNote: note }),

      applyCoupon: (code: string) => {
        const clean = code.trim().toUpperCase();
        if (clean === 'DIVINE10' || clean === 'RIYA10') {
          set({ appliedCoupon: clean });
          return { success: true, message: `✨ ${clean} applied: 10% Off your order!`, discountPercent: 10 };
        }
        if (clean === 'LUXURY15' || clean === 'RIYA15') {
          set({ appliedCoupon: clean });
          return { success: true, message: `✨ ${clean} applied: 15% Off your order!`, discountPercent: 15 };
        }
        if (clean === 'DIVINE20' || clean === 'KUNDALI20' || clean === 'DIWALI20' || clean === 'SHUBH20') {
          set({ appliedCoupon: 'DIWALI20' });
          return { success: true, message: '🪔 DIWALI20 applied: Flat 20% Festive Off your order!', discountPercent: 20 };
        }
        if (clean === 'DIWALI' || clean === 'SHUBH15') {
          set({ appliedCoupon: 'DIWALI' });
          return { success: true, message: '🪔 DIWALI applied: Flat 15% Festive Off your order!', discountPercent: 15 };
        }
        return { success: false, message: 'Invalid promo code. Try DIWALI20 or DIVINE10.', discountPercent: 0 };
      },

      removeCoupon: () => set({ appliedCoupon: null }),
    }),
    {
      name: 'riya-tarot-storage',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        energizationNote: state.energizationNote,
        appliedCoupon: state.appliedCoupon,
      }),
    }
  )
);

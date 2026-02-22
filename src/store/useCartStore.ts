import { create } from 'zustand';
import { Product } from '../types/Product';

interface CartState {
  /** Array of products currently in the shopping cart */
  items: Product[];
  /**
   * Adds a product to the cart
   * @param {Product} product - The product to add to the cart
   */
  addToCart: (product: Product) => void;
}

/**
 * Zustand store hook for managing shopping cart state
 * Provides global cart management with add to cart functionality
 * @returns {CartState} Cart state and methods
 */
export const useCartStore = create<CartState>(set => ({
  items: [],
  addToCart: product =>
    set(state => ({
      items: [...state.items, product],
    })),
}));

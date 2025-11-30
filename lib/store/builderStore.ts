import { create } from "zustand";
import type { Chain, Charm, BuilderStore, SelectedCharm, BuilderCartItem } from "@/types";

export const useBuilderStore = create<BuilderStore>((set, get) => ({
  currentChain: null,
  selectedCharms: [],
  cart: [],

  setChain: (chain: Chain | null) => {
    set({ currentChain: chain, selectedCharms: [] });
  },

  addCharm: (charm: Charm, position: number) => {
    const state = get();
    
    // Check if chain is selected
    if (!state.currentChain) {
      return;
    }

    // Check if position is already occupied
    const existingCharm = state.selectedCharms.find(
      (sc) => sc.position === position
    );
    if (existingCharm) {
      return;
    }

    // Check if max charms limit is reached
    if (state.selectedCharms.length >= state.currentChain.maxCharms) {
      return;
    }

    set({
      selectedCharms: [...state.selectedCharms, { charm, position }].sort(
        (a, b) => a.position - b.position
      ),
    });
  },

  removeCharm: (position: number) => {
    set((state) => ({
      selectedCharms: state.selectedCharms.filter(
        (sc) => sc.position !== position
      ),
    }));
  },

  clearBuilder: () => {
    set({ currentChain: null, selectedCharms: [] });
  },

  getTotalPrice: () => {
    const state = get();
    if (!state.currentChain) {
      return 0;
    }

    const charmsTotal = state.selectedCharms.reduce(
      (sum, sc) => sum + sc.charm.price,
      0
    );

    return state.currentChain.price + charmsTotal;
  },

  getAvailablePositions: () => {
    const state = get();
    if (!state.currentChain) {
      return [];
    }

    const maxPositions = state.currentChain.maxCharms;
    const occupiedPositions = new Set(
      state.selectedCharms.map((sc) => sc.position)
    );
    const available: number[] = [];

    for (let i = 0; i < maxPositions; i++) {
      if (!occupiedPositions.has(i)) {
        available.push(i);
      }
    }

    return available;
  },

  addToCart: () => {
    const state = get();
    
    if (!state.currentChain) {
      return;
    }

    const totalPrice = state.currentChain.price +
      state.selectedCharms.reduce((sum, sc) => sum + sc.charm.price, 0);

    const cartItem: BuilderCartItem = {
      id: `necklace-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      chain: state.currentChain,
      charms: state.selectedCharms.map((sc) => sc.charm),
      totalPrice: totalPrice,
    };

    set({
      cart: [...state.cart, cartItem],
    });
  },

  removeFromCart: (id: string) => {
    set((state) => ({
      cart: state.cart.filter((item) => item.id !== id),
    }));
  },
}));


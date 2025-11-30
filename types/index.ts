// Product types
export interface Chain {
  id: string;
  name: string;
  image: string;
  price: number;
  maxCharms: number;
}

export type CharmCategory = "Symbols" | "Foodie" | "Coquette";

export interface Charm {
  id: string;
  name: string;
  price: number;
  image: string;
  category: CharmCategory;
}

export interface Necklace {
  id: string;
  chainType: string;
  chainLength: number;
  charms: Charm[];
  totalPrice: number;
}

export interface CartItem {
  id: string;
  product: Chain | Charm | Necklace;
  quantity: number;
}

// Builder types
export interface SelectedCharm {
  charm: Charm;
  position: number; // Position index on the chain (0-based)
}

export interface BuilderCartItem {
  id: string;
  chain: Chain;
  charms: Charm[];
  totalPrice: number;
}

// Store types
export interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
}

export interface BuilderStore {
  currentChain: Chain | null;
  selectedCharms: SelectedCharm[];
  cart: BuilderCartItem[];
  setChain: (chain: Chain | null) => void;
  addCharm: (charm: Charm, position: number) => void;
  removeCharm: (position: number) => void;
  clearBuilder: () => void;
  getTotalPrice: () => number;
  getAvailablePositions: () => number[];
  addToCart: () => void;
  removeFromCart: (id: string) => void;
}


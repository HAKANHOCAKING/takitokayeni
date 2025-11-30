import type { Chain, Charm } from "@/types";

// Chains (Base products)
export const chains: Chain[] = [
  {
    id: "chain-gold-001",
    name: "Gold Chain",
    image: "/chain-gold.png",
    price: 15,
    maxCharms: 5,
  },
  {
    id: "chain-silver-001",
    name: "Silver Chain",
    image: "/chain-silver.png",
    price: 15,
    maxCharms: 5,
  },
  {
    id: "chain-rose-gold-001",
    name: "Rose Gold",
    image: "/rose-gold.png",
    price: 15,
    maxCharms: 5,
  },
];

// Charms (Accessories)
export const charms: Charm[] = [
  {
    id: "charm-cherry",
    name: "Cherry",
    image: "/charm-cherry.png",
    category: "Foodie",
    price: 5,
  },
  {
    id: "charm-bow",
    name: "Bow",
    image: "/charm-bow.png",
    category: "Coquette",
    price: 5,
  },
  {
    id: "charm-cowboy-boot",
    name: "Cowboy Boot",
    image: "/charm-boot.png",
    category: "Symbols",
    price: 5,
  },
];

// Helper functions to get data
export const getChainById = (id: string): Chain | undefined => {
  return chains.find((chain) => chain.id === id);
};

export const getCharmById = (id: string): Charm | undefined => {
  return charms.find((charm) => charm.id === id);
};

export const getCharmsByCategory = (category: Charm["category"]): Charm[] => {
  return charms.filter((charm) => charm.category === category);
};

export const getAllCategories = (): Charm["category"][] => {
  return Array.from(new Set(charms.map((charm) => charm.category)));
};

"use client";

import Link from "next/link";
import { chains, charms, getAllCategories } from "@/lib/data";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/molecules/Card";
import { Button } from "@/components/atoms/Button";
import { formatPrice } from "@/lib/utils";
import { ShoppingCart, Sparkles } from "lucide-react";
import { useCartStore } from "@/lib/store/cartStore";

export default function ProductsPage() {
  const addItem = useCartStore((state) => state.addItem);

  const handleAddChainToCart = (chain: typeof chains[0]) => {
    addItem({
      id: chain.id,
      product: chain,
      quantity: 1,
    });
  };

  const handleAddCharmToCart = (charm: typeof charms[0]) => {
    addItem({
      id: charm.id,
      product: charm,
      quantity: 1,
    });
  };

  const categories = getAllCategories();

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="mb-12 text-center">
        <h1 className="font-display text-4xl md:text-5xl font-bold mb-4 text-gray-900">
          Our Collection
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Discover our handcrafted chains and charming accessories. 
          Mix and match to create your perfect personalized necklace.
        </p>
      </div>

      {/* Chains Section */}
      <section className="mb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-semibold">Chains</h2>
          <p className="text-gray-600">Choose your base</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {chains.map((chain) => (
            <Card key={chain.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={chain.image}
                  alt={chain.name}
                  className="w-full h-full object-contain"
                />
              </div>
              <CardHeader>
                <CardTitle>{chain.name}</CardTitle>
                <CardDescription>
                  Up to {chain.maxCharms} charms
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="font-display text-2xl font-bold text-gray-900">
                  {formatPrice(chain.price)}
                </p>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button
                  variant="primary"
                  className="flex-1"
                  onClick={() => handleAddChainToCart(chain)}
                >
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Add to Cart
                </Button>
                <Link href="/builder" className="flex-1">
                  <Button variant="outline" className="w-full">
                    <Sparkles className="h-4 w-4 mr-2" />
                    Customize
                  </Button>
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Charms Section */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="font-display text-3xl font-semibold">Charms</h2>
          <p className="text-gray-600">Personalize your necklace</p>
        </div>

        {/* Charms by Category */}
        {categories.map((category) => {
          const categoryCharms = charms.filter((charm) => charm.category === category);
          
          return (
            <div key={category} className="mb-12">
              <h3 className="font-display text-2xl font-semibold mb-6 text-gray-800">
                {category}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categoryCharms.map((charm) => (
                  <Card key={charm.id} className="overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative aspect-square bg-gray-50 p-4">
                      <img
                        src={charm.image}
                        alt={charm.name}
                        className="w-full h-full object-contain"
                      />
                    </div>
                    <CardContent className="p-4">
                      <h4 className="font-semibold text-sm mb-2">{charm.name}</h4>
                      <p className="font-display text-lg font-bold text-gray-900 mb-3">
                        {formatPrice(charm.price)}
                      </p>
                      <Button
                        variant="outline"
                        size="sm"
                        className="w-full"
                        onClick={() => handleAddCharmToCart(charm)}
                      >
                        <ShoppingCart className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          );
        })}
      </section>
    </div>
  );
}


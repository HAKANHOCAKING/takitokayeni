"use client";

import { chains } from "@/lib/data";
import { useBuilderStore } from "@/lib/store/builderStore";
import { Card, CardContent } from "@/components/molecules/Card";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const ChainSelector = () => {
  const currentChain = useBuilderStore((state) => state.currentChain);
  const setChain = useBuilderStore((state) => state.setChain);

  return (
    <div className="space-y-4">
      <h2 className="font-display text-2xl font-semibold">Select Your Chain</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {chains.map((chain) => (
          <Card
            key={chain.id}
            className={cn(
              "cursor-pointer transition-all hover:shadow-lg",
              currentChain?.id === chain.id && "ring-2 ring-gray-900"
            )}
            onClick={() => setChain(chain)}
          >
            <CardContent className="p-6">
              <div className="relative aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                {currentChain?.id === chain.id && (
                  <div className="absolute top-2 right-2 bg-gray-900 text-white rounded-full p-1 z-10">
                    <Check className="h-4 w-4" />
                  </div>
                )}
                <img
                  src={chain.image}
                  alt={chain.name}
                  className="w-full h-full object-cover"
                />
              </div>
              <h3 className="font-semibold text-lg mb-2">{chain.name}</h3>
              <p className="text-gray-600 text-sm mb-2">
                Up to {chain.maxCharms} charms
              </p>
              <p className="font-semibold">${chain.price.toFixed(2)}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};


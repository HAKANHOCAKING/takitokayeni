"use client";

import { DndContext, DragEndEvent, DragOverlay, closestCenter } from "@dnd-kit/core";
import { useBuilderStore } from "@/lib/store/builderStore";
import { ChainSelector } from "@/components/organisms/ChainSelector";
import { DropZone } from "@/components/organisms/DropZone";
import { CharmPicker } from "@/components/organisms/CharmPicker";
import { DraggableCharm } from "@/components/organisms/DraggableCharm";
import { Button } from "@/components/atoms/Button";
import { RotateCcw, ShoppingCart } from "lucide-react";
import { useState } from "react";
import type { Charm } from "@/types";
import { useRouter } from "next/navigation";

export default function BuilderPage() {
  const router = useRouter();
  const currentChain = useBuilderStore((state) => state.currentChain);
  const selectedCharms = useBuilderStore((state) => state.selectedCharms);
  const addCharm = useBuilderStore((state) => state.addCharm);
  const clearBuilder = useBuilderStore((state) => state.clearBuilder);
  const getAvailablePositions = useBuilderStore(
    (state) => state.getAvailablePositions
  );
  const addToCart = useBuilderStore((state) => state.addToCart);
  const [activeCharm, setActiveCharm] = useState<Charm | null>(null);

  // Calculate total price
  const totalPrice = currentChain
    ? currentChain.price +
      selectedCharms.reduce((sum, sc) => sum + sc.charm.price, 0)
    : 0;

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over || !currentChain) {
      setActiveCharm(null);
      return;
    }

    // Check if dropped on a slot (format: "slot-0", "slot-1", etc.)
    if (typeof over.id === 'string' && over.id.startsWith('slot-')) {
      const charmData = active.data.current as { charm: Charm } | undefined;
      
      if (charmData?.charm) {
        // Extract slot position from id (e.g., "slot-2" -> 2)
        const slotPosition = parseInt(over.id.split('-')[1], 10);
        
        // Check if slot is available
        const availablePositions = getAvailablePositions();
        if (availablePositions.includes(slotPosition)) {
          addCharm(charmData.charm, slotPosition);
        }
      }
    }

    setActiveCharm(null);
  };

  const handleDragStart = (event: any) => {
    const charmData = event.active.data.current as { charm: Charm } | undefined;
    if (charmData?.charm) {
      setActiveCharm(charmData.charm);
    }
  };

  const handleReset = () => {
    clearBuilder();
  };

  const handleAddToCart = () => {
    if (!currentChain || selectedCharms.length === 0) return;

    // Add to cart using builderStore
    addToCart();

    // Show success message
    alert("Necklace added to cart successfully!");

    // Redirect to cart
    router.push("/cart");
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="min-h-screen bg-gray-50 pb-24">
        <div className="container mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-2 text-gray-900">
              Charm Builder
            </h1>
            <p className="text-gray-600">
              Create your personalized charm necklace
            </p>
          </div>

          {/* Chain Selector - Show if no chain selected */}
          {!currentChain && (
            <div className="mb-12">
              <ChainSelector />
            </div>
          )}

          {/* Main Builder Interface */}
          {currentChain && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
              {/* Preview Stage - Top/Left */}
              <div className="flex flex-col">
                <div className="mb-4 flex items-center justify-between">
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-1">
                      {currentChain.name}
                    </h2>
                    <p className="text-sm text-gray-600">
                      Drag charms onto the chain
                    </p>
                  </div>
                  <Button
                    onClick={handleReset}
                    variant="outline"
                    size="sm"
                    className="flex items-center gap-2"
                  >
                    <RotateCcw className="h-4 w-4" />
                    Reset
                  </Button>
                </div>
                <DropZone />
              </div>

              {/* Charm Picker - Bottom/Right */}
              <div className="flex flex-col border border-gray-200 rounded-lg p-6 bg-white shadow-sm">
                <CharmPicker />
              </div>
            </div>
          )}
        </div>

        {/* Floating Total Price Bar */}
        {currentChain && (
          <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
            <div className="container mx-auto px-4 py-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Price</p>
                  <p className="font-display text-2xl font-bold text-gray-900">
                    ${totalPrice.toFixed(2)}
                  </p>
                </div>
                <Button
                  onClick={handleAddToCart}
                  variant="primary"
                  size="lg"
                  className="flex items-center gap-2"
                  disabled={selectedCharms.length === 0}
                >
                  <ShoppingCart className="h-5 w-5" />
                  <span>Add to Cart</span>
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Drag Overlay */}
        <DragOverlay>
          {activeCharm ? (
            <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-900 flex items-center justify-center shadow-lg overflow-hidden">
              <img
                src={activeCharm.image}
                alt={activeCharm.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : null}
        </DragOverlay>
      </div>
    </DndContext>
  );
}


"use client";

import { useState } from "react";
import { charms, getAllCategories, getCharmsByCategory } from "@/lib/data";
import type { CharmCategory } from "@/types";
import { DraggableCharm } from "@/components/organisms/DraggableCharm/DraggableCharm";
import { cn } from "@/lib/utils";

export const CharmPicker = () => {
  const [selectedCategory, setSelectedCategory] = useState<CharmCategory | "All">("All");
  const categories = getAllCategories();

  const displayedCharms =
    selectedCategory === "All"
      ? charms
      : getCharmsByCategory(selectedCategory);

  return (
    <div className="w-full h-full flex flex-col">
      <div className="mb-4">
        <h2 className="font-display text-2xl font-semibold mb-4">
          Choose Your Charms
        </h2>
        
        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 mb-4">
          <button
            onClick={() => setSelectedCategory("All")}
            className={cn(
              "px-4 py-2 rounded-full text-sm font-medium transition-colors",
              selectedCategory === "All"
                ? "bg-gray-900 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            )}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-colors",
                selectedCategory === category
                  ? "bg-gray-900 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              )}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Charms Grid */}
      <div className="flex-1 overflow-y-auto">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 p-2">
          {displayedCharms.map((charm) => (
            <DraggableCharm key={charm.id} charm={charm} />
          ))}
        </div>
      </div>
    </div>
  );
};


"use client";

import { useDraggable } from "@dnd-kit/core";
import type { Charm } from "@/types";
import { cn } from "@/lib/utils";

interface DraggableCharmProps {
  charm: Charm;
  isOnChain?: boolean;
  position?: number;
}

export const DraggableCharm = ({
  charm,
  isOnChain = false,
  position,
}: DraggableCharmProps) => {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: isOnChain ? `charm-chain-${position}` : `charm-picker-${charm.id}`,
    data: {
      charm,
      position,
      isOnChain,
    },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  // On chain: 64px (w-16 h-16) - transparent image only with drop shadow
  // NO background, NO border, NO padding, NO shadow, NO rounded - purely transparent PNG
  if (isOnChain) {
    return (
      <div
        ref={setNodeRef}
        style={{
          ...style,
          background: 'transparent',
          border: 'none',
          padding: 0,
          margin: 0,
          boxShadow: 'none',
          borderRadius: 0,
        }}
        {...listeners}
        {...attributes}
        className={cn(
          "cursor-grab active:cursor-grabbing transition-opacity z-30",
          "bg-transparent border-0 p-0 m-0 shadow-none rounded-none",
          isDragging && "opacity-50"
        )}
      >
        <img
          src={charm.image}
          alt={charm.name}
          className="w-16 h-16 object-contain drop-shadow-md mix-blend-multiply"
          style={{
            background: 'transparent',
            display: 'block',
          }}
        />
      </div>
    );
  }

  // In picker: larger size with image
  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "cursor-grab active:cursor-grabbing transition-opacity flex flex-col items-center",
        isDragging && "opacity-50"
      )}
    >
      <div className="w-16 h-16 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center shadow-sm hover:shadow-md transition-shadow overflow-hidden">
        <img
          src={charm.image}
          alt={charm.name}
          className="w-full h-full object-cover"
        />
      </div>
      <p className="text-xs text-center mt-1 text-gray-600 max-w-[64px] truncate">
        {charm.name}
      </p>
    </div>
  );
};


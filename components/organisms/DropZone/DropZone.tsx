"use client";

import { useDroppable } from "@dnd-kit/core";
import { useBuilderStore } from "@/lib/store/builderStore";
import { DraggableCharm } from "@/components/organisms/DraggableCharm/DraggableCharm";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";

// Slot positions along the chain curve
const SLOT_POSITIONS = [
  { id: 0, top: '35%', left: '22%' }, // Top Left
  { id: 1, top: '60%', left: '26%' }, // Middle Left
  { id: 2, top: '88%', left: '50%', transform: 'translateX(-50%)' }, // Bottom Center
  { id: 3, top: '60%', left: '74%' }, // Middle Right
  { id: 4, top: '35%', left: '78%' }, // Top Right
];

interface SlotProps {
  slot: typeof SLOT_POSITIONS[0];
  selectedCharm: { charm: any; position: number } | undefined;
  onRemove: (position: number) => void;
}

const Slot = ({ slot, selectedCharm, onRemove }: SlotProps) => {
  const { setNodeRef, isOver } = useDroppable({
    id: `slot-${slot.id}`,
    disabled: !!selectedCharm, // Disable if slot is occupied
  });

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "absolute z-30",
        "flex items-center justify-center",
        isOver && "scale-110 transition-transform"
      )}
      style={{
        top: slot.top,
        left: slot.left,
        transform: slot.transform || 'none',
      }}
    >
      {selectedCharm ? (
        <div 
          className="relative group bg-transparent border-0 p-0 shadow-none rounded-none m-0"
          style={{ 
            background: 'transparent',
            border: 'none',
            padding: 0,
            margin: 0,
            boxShadow: 'none',
            borderRadius: 0
          }}
        >
          <DraggableCharm
            charm={selectedCharm.charm}
            isOnChain={true}
            position={slot.id}
          />
          <button
            onClick={() => onRemove(slot.id)}
            className="absolute -top-1 -right-1 bg-red-500 text-white rounded-full p-1.5 opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600 z-40 shadow-lg"
            aria-label="Remove charm"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ) : (
        <div className="w-16 h-16 rounded-full border border-dashed border-gray-300/40 bg-transparent flex items-center justify-center transition-all hover:border-gray-300/60">
          <span className="text-gray-400/50 text-xs font-medium">{slot.id + 1}</span>
        </div>
      )}
    </div>
  );
};

export const DropZone = () => {
  const currentChain = useBuilderStore((state) => state.currentChain);
  const selectedCharms = useBuilderStore((state) => state.selectedCharms);
  const removeCharm = useBuilderStore((state) => state.removeCharm);
  const maxCharms = currentChain?.maxCharms || 0;

  if (!currentChain) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-300 min-h-[400px]">
        <p className="text-gray-400 text-center">
          Please select a chain to start building
        </p>
      </div>
    );
  }

  // Get slots to display (up to maxCharms)
  const slotsToDisplay = SLOT_POSITIONS.slice(0, maxCharms);

  return (
    <div className="w-full h-full flex flex-col relative min-h-[500px]">
      {/* Preview Stage with Chain Background */}
      <div className="flex-1 relative rounded-lg overflow-hidden bg-gray-50">
        {/* Chain Image Background - Responsive and Centered */}
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <img 
            src={currentChain.image} 
            alt={currentChain.name}
            className="w-full h-full object-contain"
          />
        </div>

        {/* Individual Slot Positions - Absolutely Positioned Along Chain Curve */}
        {slotsToDisplay.map((slot) => {
          const selectedCharm = selectedCharms.find(
            (sc) => sc.position === slot.id
          );

          return (
            <Slot
              key={slot.id}
              slot={slot}
              selectedCharm={selectedCharm}
              onRemove={removeCharm}
            />
          );
        })}
      </div>
    </div>
  );
};

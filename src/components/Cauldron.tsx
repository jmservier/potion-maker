"use client";

import { Ingredient } from "@prisma/client";

interface CauldronProps {
  selectedIngredients: Ingredient[];
  onRemoveIngredient: (ingredient: Ingredient) => void;
}

export function Cauldron({ selectedIngredients, onRemoveIngredient }: CauldronProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🧙‍♂️</span> Chaudron
      </h2>
      <div className="min-h-[30rem] min-w-[20rem] border-2 border-dashed border-amber-500/30 rounded-xl p-4">
        {selectedIngredients.length === 0 ? (
          <div className="h-full flex items-center justify-center text-amber-500/50">
            Drop ingredients here
          </div>
        ) : (
          <div className="space-y-2">
            {selectedIngredients.map((ingredient) => (
              <div
                key={ingredient.id}
                className="bg-amber-500/20 border border-amber-500/30 rounded-lg p-3 flex items-center justify-between"
              >
                <span className="text-white font-medium">{ingredient.name}</span>
                <button
                  onClick={() => onRemoveIngredient(ingredient)}
                  className="text-red-400 hover:text-red-300 transition-colors"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
"use client";

import { Ingredient } from "@prisma/client";
import { useMutation } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface CauldronProps {
  selectedIngredients: Ingredient[];
  onRemoveIngredient: (index: number) => void;
}

export function Cauldron({
  selectedIngredients,
  onRemoveIngredient,
}: CauldronProps) {
  const { mutate: brewPotion } = useMutation({
    mutationFn: async (ingredientNames: Ingredient[]) => {
      const response = await fetch("/api/recipes/check", {
        method: "POST",
        body: JSON.stringify({ ingredientNames }),
      });
      const data = await response.json();
      console.log(" Cauldron.tsx:23 data:", data);
      return data;
    },
  });

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🔮</span> Cauldron
      </h2>

      {/* Selected Ingredients */}
      <div className="mb-4">
        <div className="flex flex-wrap gap-2 mb-4 min-h-[60px] p-3 bg-gray-800/50 rounded-lg border-2 border-dashed border-gray-600">
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={`${ingredient.id}-${index}`}
              className="flex items-center gap-1 bg-amber-600/30 text-white px-2 py-1 rounded-full text-sm border border-amber-400/50"
            >
              <span>🔮</span>
              <span>{ingredient.name}</span>
              <button
                onClick={() => onRemoveIngredient(index)}
                className="ml-1 text-red-400 hover:text-red-300"
              >
                <X size={14} />
              </button>
            </div>
          ))}
          {selectedIngredients.length === 0 && (
            <div className="text-gray-400 text-sm flex items-center justify-center w-full">
              Select 3 ingredients
            </div>
          )}
        </div>

        <div className="text-center text-sm text-amber-200 mb-4">
          {selectedIngredients.length}/3 ingredients selected
        </div>

        <Button
          onClick={() => brewPotion(selectedIngredients)}
          className="bg-amber-500 text-black px-4 py-2 rounded-lg"
        >
          Brew Potion
        </Button>
      </div>
    </div>
  );
}

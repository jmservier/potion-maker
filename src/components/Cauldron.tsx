"use client";

import React from "react";
import { Ingredient } from "@prisma/client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { Button } from "./ui/button";

interface CauldronProps {
  selectedIngredients: Ingredient[];
  onRemoveIngredient: (index: number) => void;
  onSuccess?: () => void;
  onClear: () => void;
}

export function Cauldron({
  selectedIngredients,
  onRemoveIngredient,
  onSuccess,
  onClear,
}: CauldronProps) {
  const queryClient = useQueryClient();

  const { mutate: brewPotion, isPending } = useMutation({
    mutationFn: async (ingredients: Ingredient[]) => {
      const ingredientNames = ingredients.map((ingredient) => ingredient.name);

      const response = await fetch("/api/recipes/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ingredientNames }),
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to brew potion");
      }
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error(error);
    },
  });

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🔮</span> Cauldron
      </h2>
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
        <div className="space-y-2">
          <Button
            onClick={() => brewPotion(selectedIngredients)}
            disabled={selectedIngredients.length !== 3 || isPending}
            className="w-full bg-amber-500 hover:bg-amber-600 text-black font-semibold py-2 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? "Brewing..." : "Brew Potion"}
          </Button>
          <Button
            onClick={onClear}
            disabled={selectedIngredients.length === 0 || isPending}
            variant="outline"
            className="w-full border-amber-500/50 text-amber-200 hover:bg-amber-500/10"
          >
            Clear Selection
          </Button>
        </div>
      </div>
    </div>
  );
}

"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Ingredient } from "@/schemas";
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
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: ["ingredients"] });
      // TODO: check if recipe is already discovered
      if (data.success) {
        toast.success(`🎉 Recipe discovered: ${data.recipe.name}!`);
      } else {
        toast.error("No recipe found with these ingredients");
      }
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Failed to brew potion");
    },
  });

  return (
    <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
        <span>🔮</span> Cauldron
      </h2>
      <div className="mb-4">
        <div className="mb-4 flex min-h-[60px] flex-wrap gap-2 rounded-lg border-2 border-dashed border-gray-600 bg-gray-800/50 p-3">
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={`${ingredient.id}-${index}`}
              className="flex items-center gap-1 rounded-full border border-amber-400/50 bg-amber-600/30 px-2 py-1 text-sm text-white"
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
            <div className="flex w-full items-center justify-center text-sm text-gray-400">
              Select 3 ingredients
            </div>
          )}
        </div>
        <div className="mb-4 text-center text-sm text-amber-200">
          {selectedIngredients.length}/3 ingredients selected
        </div>
        <div className="space-y-2">
          <Button
            onClick={() => brewPotion(selectedIngredients)}
            disabled={selectedIngredients.length !== 3 || isPending}
            className="w-full rounded-lg bg-amber-500 py-2 font-semibold text-black hover:bg-amber-600 disabled:cursor-not-allowed disabled:opacity-50"
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

"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X, Sparkles, RotateCcw } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Ingredient } from "@/schemas";

interface CauldronProps {
  selectedIngredients: Ingredient[];
  onRemoveIngredient: (index: number) => void;
  onSuccess?: () => void;
  onClear: () => void;
  onReset?: () => void;
}

export function Cauldron({
  selectedIngredients,
  onRemoveIngredient,
  onSuccess,
  onClear,
  onReset,
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
        toast.success(`🎉 Recette découverte : ${data.recipe.name} !`);
      } else {
        toast.error("Aucune recette trouvée avec ces ingrédients");
      }
      if (onSuccess) {
        onSuccess();
      }
    },
    onError: (error: Error) => {
      console.error(error);
      toast.error("Échec de la préparation de la potion");
    },
  });

  return (
    <div className="rounded-2xl p-6 fade-in">
      <h2 className="mb-6 flex items-center gap-3 text-2xl font-bold">
        <span>🔮</span> Station de Brassage
      </h2>
      <div className="mb-6">
        <div className="brewing-area flex min-h-[120px] flex-wrap items-center justify-center gap-3 rounded-xl p-6">
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={`${ingredient.id}-${index}`}
              className="selected-ingredient flex items-center gap-3 rounded-xl px-4 py-3"
            >
              <span className="text-xl">🔮</span>
              <span className="font-semibold">{ingredient.name}</span>
              <button
                onClick={() => onRemoveIngredient(index)}
                className="ml-2 transition-colors"
              >
                <X size={18} />
              </button>
            </div>
          ))}
          {selectedIngredients.length === 0 && (
            <div className="text-center">
              <div className="mb-3 text-5xl opacity-50">🧪</div>
              <div className="text-base font-medium">
                Sélectionnez 3 ingrédients pour commencer
              </div>
            </div>
          )}
        </div>
        <div className="mt-4 text-center text-base font-medium">
          {selectedIngredients.length}/3 ingrédients sélectionnés
        </div>
      </div>
      <div className="space-y-4">
        <Button
          onClick={() => brewPotion(selectedIngredients)}
          disabled={selectedIngredients.length !== 3 || isPending}
          className="btn-primary w-full rounded-xl py-4 text-lg font-bold text-white transition-all duration-200 disabled:opacity-50"
        >
          <Sparkles className="mr-3" size={24} />
          {isPending ? "Création en cours..." : "Créer la Potion"}
        </Button>
        <div className="flex gap-4">
          <Button
            onClick={onClear}
            disabled={selectedIngredients.length === 0 || isPending}
            variant="outline"
            className="flex-1 btn-secondary rounded-xl font-semibold py-3 bg-transparent"
          >
            Vider
          </Button>
          {onReset && (
            <Button
              onClick={onReset}
              variant="outline"
              className="flex-1 btn-secondary rounded-xl font-semibold py-3 bg-transparent"
            >
              <RotateCcw size={18} className="mr-2" />
              Reset
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
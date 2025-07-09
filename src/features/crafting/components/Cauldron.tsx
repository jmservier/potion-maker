"use client";

import React from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { X } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Ingredient } from "@/schemas";

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
    <div
      className="rounded-2xl p-6"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)",
        backdropFilter: "blur(10px)",
        border: "1px solid rgba(222, 184, 135, 0.3)",
        boxShadow: "0 4px 20px rgba(222, 184, 135, 0.3)",
      }}
    >
      <h2
        className="mb-6 flex items-center gap-3 text-2xl font-bold"
        style={{ color: "#3d2914" }}
      >
        <span>🔮</span> Station de Brassage
      </h2>
      <div className="mb-6">
        <div
          className="flex min-h-[120px] flex-wrap items-center justify-center gap-3 rounded-xl p-6"
          style={{
            background:
              selectedIngredients.length > 0
                ? "linear-gradient(135deg, rgba(222, 184, 135, 0.15) 0%, rgba(205, 133, 63, 0.1) 100%)"
                : "linear-gradient(135deg, rgba(255, 248, 240, 0.8) 0%, rgba(222, 184, 135, 0.1) 100%)",
            border:
              selectedIngredients.length > 0
                ? "2px dashed rgba(160, 82, 45, 0.6)"
                : "2px dashed rgba(210, 180, 140, 0.5)",
            boxShadow:
              selectedIngredients.length > 0
                ? "inset 0 0 20px rgba(222, 184, 135, 0.2)"
                : "none",
          }}
        >
          {selectedIngredients.map((ingredient, index) => (
            <div
              key={`${ingredient.id}-${index}`}
              className="flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(222, 184, 135, 0.2) 100%)",
                border: "1px solid rgba(160, 82, 45, 0.4)",
                boxShadow: "0 2px 10px rgba(160, 82, 45, 0.2)",
              }}
            >
              <span className="text-xl">🔮</span>
              <span className="font-semibold" style={{ color: "#3d2914" }}>
                {ingredient.name}
              </span>
              <button
                onClick={() => onRemoveIngredient(index)}
                className="ml-2 transition-colors"
                style={{ color: "#8b4513" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#3d2914")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#8b4513")}
              >
                <X size={18} />
              </button>
            </div>
          ))}
          {selectedIngredients.length === 0 && (
            <div className="text-center" style={{ color: "#8b4513" }}>
              <div className="mb-3 text-5xl opacity-50">🧪</div>
              <div className="text-base font-medium">
                Sélectionnez 3 ingrédients pour commencer
              </div>
            </div>
          )}
        </div>
        <div
          className="mt-4 text-center text-base font-medium"
          style={{ color: "#8b4513" }}
        >
          {selectedIngredients.length}/3 ingrédients sélectionnés
        </div>
      </div>
      <div className="space-y-4">
        <Button
          onClick={() => brewPotion(selectedIngredients)}
          disabled={selectedIngredients.length !== 3 || isPending}
          className="w-full rounded-xl py-4 text-lg font-bold text-white transition-all duration-200 disabled:opacity-50"
          style={{
            background: "linear-gradient(135deg, #a0522d 0%, #8b4513 100%)",
            boxShadow: "0 4px 15px rgba(160, 82, 45, 0.3)",
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #8b4513 0%, #654321 100%)";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.background =
                "linear-gradient(135deg, #a0522d 0%, #8b4513 100%)";
            }
          }}
        >
          {isPending ? "Brassage..." : "Brasser la Potion"}
        </Button>
        <Button
          onClick={onClear}
          disabled={selectedIngredients.length === 0 || isPending}
          variant="outline"
          className="w-full rounded-xl bg-transparent py-3 font-semibold"
          style={{
            border: "1px solid #cd853f",
            color: "#8b4513",
          }}
          onMouseEnter={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = "rgba(205, 133, 63, 0.1)";
            }
          }}
          onMouseLeave={(e) => {
            if (!e.currentTarget.disabled) {
              e.currentTarget.style.backgroundColor = "transparent";
            }
          }}
        >
          Effacer la Sélection
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Cauldron } from "@/features/crafting/components/cauldron";
import { RecipeBook } from "@/features/crafting/components/recipe-book";
import { IngredientsGrid } from "@/features/ingredients/components/ingredients-grid";
import { useIngredients } from "@/features/ingredients/hooks/useIngredients";
import { Ingredient, Recipe } from "@/schemas";

async function fetchRecipes(): Promise<Recipe[]> {
  const response = await fetch("/api/recipes");
  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }
  return response.json();
}

async function resetRecipes() {
  const response = await fetch("/api/recipes/reset", {
    method: "POST",
  });
  if (!response.ok) {
    throw new Error("Failed to reset recipes");
  }
  return response.json();
}

export default function CraftingView({
  ingredients: initialIngredients,
}: {
  ingredients: Ingredient[];
}) {
  const { data: ingredients = [] } = useIngredients(initialIngredients);
  const { data: recipes = [], refetch: refetchRecipes } = useQuery({
    queryKey: ["recipes"],
    queryFn: fetchRecipes,
  });

  const { mutate: resetRecipesMutate } = useMutation({
    mutationFn: resetRecipes,
    onSuccess: () => {
      refetchRecipes();
    },
    onError: (error) => {
      console.error("Failed to reset recipes:", error);
    },
  });

  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const isAlreadySelected = prev.some(
        (selected) => selected.id === ingredient.id,
      );
      if (isAlreadySelected) {
        return prev.filter((selected) => selected.id !== ingredient.id);
      } else {
        if (prev.length >= 3) {
          return prev;
        }
        return [...prev, ingredient];
      }
    });
  };

  const handleRemoveIngredient = (index: number) => {
    setSelectedIngredients((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSuccess = () => {
    refetchRecipes();
    setSelectedIngredients([]);
  };

  const handleClear = () => {
    setSelectedIngredients([]);
  };

  const handleResetRecipes = () => {
    resetRecipesMutate();
  };

  return (
    <div className="fade-in grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="glass-card warm-glow rounded-2xl p-8 lg:col-span-2">
            <IngredientsGrid
              ingredients={ingredients}
              onIngredientSelect={handleIngredientSelect}
              selectedIngredients={selectedIngredients}
            />
          </div>
          <div className="space-y-8 lg:col-span-1">
            <div className="glass-card warm-glow rounded-2xl p-8">
              <Cauldron
                selectedIngredients={selectedIngredients}
                onRemoveIngredient={handleRemoveIngredient}
                onSuccess={handleSuccess}
                onClear={handleClear}
                onReset={handleResetRecipes}
              />
            </div>
            <div className="glass-card warm-glow rounded-2xl p-8">
              <RecipeBook recipes={recipes} />
            </div>
          </div>
    </div>
  );
}

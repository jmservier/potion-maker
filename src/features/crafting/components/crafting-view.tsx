"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigation } from "@/common/components/navigation";
import { Cauldron } from "@/features/crafting/components/cauldron";
import { IngredientsGrid } from "@/features/ingredients/components/ingredients-grid";
import { useIngredients } from "@/features/ingredients/hooks/useIngredients";
import { RecipeBook } from "@/features/recipes/components/recipe-book";
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
    <div className="min-h-screen" style={{ backgroundColor: '#faf8f0' }}>
      <div className="mx-auto max-w-7xl p-6">
        <div 
          className="mb-12 text-center"
          style={{ animation: 'fade-in 0.3s ease-out' }}
        >
          <h1 
            className="mb-4 text-5xl font-bold flex items-center justify-center gap-4"
            style={{
              background: 'linear-gradient(135deg, #a0522d 0%, #8b4513 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text'
            }}
          >
            <span>✨</span> Préparation de Potions <span>✨</span>
          </h1>
        </div>
        <Navigation />
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <IngredientsGrid
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              onIngredientSelect={handleIngredientSelect}
            />
          </div>
          <div className="lg:col-span-1">
            <Cauldron
              selectedIngredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
              onSuccess={handleSuccess}
              onClear={handleClear}
            />
            <div className="mt-4">
              <RecipeBook recipes={recipes} onReset={handleResetRecipes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

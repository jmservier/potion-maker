"use client";

import { useState } from "react";
import { Ingredient, Recipe } from "@prisma/client";
import { IngredientsGrid } from "@/components/IngredientsGrid";
import { Cauldron } from "@/components/Cauldron";
import { FoundRecipes } from "@/components/FoundRecipes";
import { Navigation } from "@/components/Navigation";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useIngredients } from "@/hooks/useIngredients";

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

export default function PotionMakerView({
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
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span>✨</span> Potion Maker<span>✨</span>
          </h1>
        </div>
        <Navigation />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
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
              <FoundRecipes recipes={recipes} onReset={handleResetRecipes} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

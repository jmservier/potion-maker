"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { Navigation } from "@/common/components/navigation";
import { Recipe } from "@/schemas";
import { RecipeBook } from "./recipe-book";

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

export default function RecipesView() {
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

  const handleResetRecipes = () => {
    resetRecipesMutate();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-4">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            <span>📜</span> Recipe Book <span>📜</span>
          </h1>
        </div>
        <Navigation />
        <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-sm">
          <RecipeBook recipes={recipes} onReset={handleResetRecipes} />
        </div>
      </div>
    </div>
  );
}

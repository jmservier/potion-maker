"use client";

import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from "@/schemas";

interface RecipeBookProps {
  recipes: Recipe[];
}

export function RecipeBook({ recipes }: RecipeBookProps) {
  const discoveredRecipes = recipes.filter((recipe) => recipe.discovered);

  return (
    <div className="rounded-2xl">
      <h2 className="mb-4 text-xl font-bold">Potions récentes</h2>

      <ScrollArea className="h-[5rem]">
        {discoveredRecipes.length === 0 ? (
          <div className="py-8 text-center text-sm">
            Aucune recette découverte
          </div>
        ) : (
          <div className="space-y-3">
            {discoveredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="potion-bottle flex items-center gap-4 rounded-lg p-4"
              >
                <div className="text-3xl">🧪</div>
                <div className="flex-1">
                  <div className="text-brown-dark font-bold">{recipe.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}

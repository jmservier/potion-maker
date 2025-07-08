"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Recipe } from "@/schemas";

interface RecipeBookProps {
  recipes: Recipe[];
  onReset?: () => void;
}

export function RecipeBook({ recipes, onReset }: RecipeBookProps) {
  const discoveredRecipes = recipes.filter((recipe) => recipe.discovered);

  return (
    <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
        <span>📜</span> Found Recipes
      </h2>

      <ScrollArea className="h-[300px]">
        {discoveredRecipes.length === 0 ? (
          <div className="py-8 text-center text-sm text-gray-400">
            No recipes discovered
          </div>
        ) : (
          <div className="space-y-3">
            {discoveredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-lg border border-amber-500/30 bg-amber-500/10 p-4"
              >
                <h3 className="mb-2 font-semibold text-white">{recipe.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {(recipe.ingredients as string[]).map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="border-amber-400/30 bg-amber-600/20 text-xs text-amber-200"
                    >
                      {ingredient}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <div className="mt-4 flex items-center justify-between">
        <div className="text-sm text-amber-200">
          {discoveredRecipes.length}/{recipes.length} recipes discovered
        </div>
        {onReset && discoveredRecipes.length > 0 && (
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="border-red-500/50 text-red-400 hover:bg-red-500/10"
          >
            Reset History
          </Button>
        )}
      </div>
    </div>
  );
}

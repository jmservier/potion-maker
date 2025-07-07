"use client";

import { Recipe } from "@prisma/client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface FoundRecipesProps {
  recipes: Recipe[];
  onReset?: () => void;
}

export function FoundRecipes({ recipes, onReset }: FoundRecipesProps) {
  const discoveredRecipes = recipes.filter((recipe) => recipe.discovered);

  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>📜</span> Found Recipes
      </h2>

      <ScrollArea className="h-[300px]">
        {discoveredRecipes.length === 0 ? (
          <div className="text-gray-400 text-sm text-center py-8">
            No recipes discovered
          </div>
        ) : (
          <div className="space-y-3">
            {discoveredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="bg-amber-500/10 border border-amber-500/30 rounded-lg p-4"
              >
                <h3 className="text-white font-semibold mb-2">{recipe.name}</h3>
                <div className="flex flex-wrap gap-1">
                  {(recipe.ingredients as string[]).map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="bg-amber-600/20 text-amber-200 border-amber-400/30 text-xs"
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

      <div className="flex items-center justify-between mt-4">
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

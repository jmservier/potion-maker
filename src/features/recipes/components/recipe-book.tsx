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
      <h2 className="mb-4 text-xl font-bold" style={{ color: "#3d2914" }}>
        📜 Recettes Trouvées
      </h2>

      <ScrollArea className="h-[300px]">
        {discoveredRecipes.length === 0 ? (
          <div
            className="py-8 text-center text-sm"
            style={{ color: "#8b4513" }}
          >
            Aucune recette découverte
          </div>
        ) : (
          <div className="space-y-3">
            {discoveredRecipes.map((recipe) => (
              <div
                key={recipe.id}
                className="rounded-lg p-4 transition-all duration-200"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.6) 100%)",
                  border: "1px solid rgba(210, 180, 140, 0.3)",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "rgba(160, 82, 45, 0.4)";
                  e.currentTarget.style.boxShadow =
                    "0 6px 20px rgba(160, 82, 45, 0.15)";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(255, 255, 255, 1) 0%, rgba(245, 230, 211, 0.8) 100%)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor =
                    "rgba(210, 180, 140, 0.3)";
                  e.currentTarget.style.boxShadow = "none";
                  e.currentTarget.style.background =
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.6) 100%)";
                }}
              >
                <h3 className="mb-2 font-semibold" style={{ color: "#3d2914" }}>
                  {recipe.name}
                </h3>
                <div className="flex flex-wrap gap-1">
                  {recipe.ingredients.map((ingredient, index) => (
                    <Badge
                      key={index}
                      variant="secondary"
                      className="text-xs"
                      style={{
                        border: "1px solid rgba(205, 133, 63, 0.3)",
                        backgroundColor: "rgba(205, 133, 63, 0.2)",
                        color: "#3d2914",
                      }}
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
        <div className="text-sm font-medium" style={{ color: "#8b4513" }}>
          {discoveredRecipes.length}/{recipes.length} recettes découvertes
        </div>
        {onReset && discoveredRecipes.length > 0 && (
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="border-red-500/50 text-red-600 hover:bg-red-500/10"
          >
            Réinitialiser l'Historique
          </Button>
        )}
      </div>
    </div>
  );
}

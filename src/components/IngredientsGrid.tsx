"use client";

import { Ingredient } from "@prisma/client";
import { IngredientCard } from "./IngredientCard";

interface IngredientsGridProps {
  ingredients: Ingredient[];
  selectedIngredients: Ingredient[];
  onIngredientSelect: (ingredient: Ingredient) => void;
}

export function IngredientsGrid({
  ingredients,
  selectedIngredients,
  onIngredientSelect,
}: IngredientsGridProps) {
  return (
    <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
      <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
        <span>🧙‍♂️</span> Ingredients
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            isSelected={selectedIngredients.some(
              (selected) => selected.id === ingredient.id,
            )}
            onClick={() => onIngredientSelect(ingredient)}
          />
        ))}
      </div>
    </div>
  );
}

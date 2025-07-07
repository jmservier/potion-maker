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
    <div className="rounded-xl border border-amber-500/30 bg-black/30 p-6 backdrop-blur-sm">
      <h2 className="mb-4 flex items-center gap-2 text-2xl font-bold text-white">
        <span>🧙‍♂️</span> Ingredients
      </h2>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 xl:grid-cols-4">
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

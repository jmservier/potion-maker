"use client";

import { Ingredient } from "@/schemas";
import { IngredientCard } from "./ingredient-card";

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
    <div 
      className="rounded-2xl p-8 shadow-lg"
      style={{
        background: 'linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(222, 184, 135, 0.3)',
        boxShadow: '0 4px 20px rgba(222, 184, 135, 0.3)'
      }}
    >
      <h2 className="mb-8 text-3xl font-bold" style={{ color: '#3d2914' }}>
        Ingrédients Disponibles
      </h2>
      <div className="grid grid-cols-2 gap-6 md:grid-cols-3 xl:grid-cols-4">
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

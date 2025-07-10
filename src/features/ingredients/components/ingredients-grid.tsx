import { Ingredient } from "@/schemas";
import { IngredientCard } from "./ingredient-card";

interface IngredientsGridProps {
  ingredients: Ingredient[];
  onIngredientSelect: (ingredient: Ingredient) => void;
  selectedIngredients: Ingredient[];
}

export function IngredientsGrid({
  ingredients,
  onIngredientSelect,
  selectedIngredients,
}: IngredientsGridProps) {
  return (
    <div className="rounded-2xl p-8">
      <h2 className="mb-8 text-3xl font-bold">Ingrédients Disponibles</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            onClick={() => onIngredientSelect(ingredient)}
            isSelected={selectedIngredients.some(
              (selected) => selected.id === ingredient.id,
            )}
          />
        ))}
      </div>
    </div>
  );
}

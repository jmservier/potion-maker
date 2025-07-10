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
    <section className="rounded-2xl p-8" aria-labelledby="ingredients-heading">
      <h2 id="ingredients-heading" className="mb-8 text-3xl font-bold">
        Ingrédients Disponibles
      </h2>
      <div
        className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4"
        role="group"
        aria-label="Available ingredients for crafting"
      >
        {ingredients.map((ingredient) => (
          <IngredientCard
            key={ingredient.id}
            ingredient={ingredient}
            onClick={() => onIngredientSelect(ingredient)}
            isSelected={selectedIngredients.some(
              (selected) => selected.id === ingredient.id,
            )}
            tabIndex={0}
          />
        ))}
      </div>
      <div className="sr-only" aria-live="polite" aria-atomic="true">
        {selectedIngredients.length > 0 &&
          `${selectedIngredients.length} ingredient${selectedIngredients.length > 1 ? "s" : ""} selected: ${selectedIngredients.map((i) => i.name).join(", ")}`}
      </div>
    </section>
  );
}

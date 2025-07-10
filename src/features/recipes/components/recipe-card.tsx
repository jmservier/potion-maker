import { Card, CardContent } from "@/components/ui/card";
import {
  getIngredientColor,
  getIngredientEmoji,
  getRecipeColor,
  getRecipeEmoji,
} from "@/lib/item-assets";
import { Recipe } from "@/schemas";

interface RecipeCardProps {
  recipe: Recipe;
}

export function RecipeCard({ recipe }: RecipeCardProps) {
  const recipeEmoji = getRecipeEmoji(recipe.name);
  const recipeColor = getRecipeColor(recipe.name);

  return (
    <Card
      className={`ingredient-card cursor-default overflow-hidden py-0 ${
        recipe.discovered ? "" : "opacity-50"
      }`}
      data-type={recipeColor}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="ingredient-emoji-container">
            <span className="ingredient-emoji">{recipeEmoji}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="-dark mb-2 text-base font-bold">{recipe.name}</h3>
          <p className="mb-4 min-h-[2.5rem] text-xs leading-relaxed">
            {recipe.description}
          </p>
          <div className="space-y-2">
            <h4 className="-dark text-xs font-semibold">Ingrédients:</h4>
            <div className="flex flex-wrap gap-1.5">
              {recipe.ingredients.map((ingredientName, idx) => {
                const ingredientType = getIngredientColor(ingredientName);
                const ingredientEmoji = getIngredientEmoji(ingredientName);
                return (
                  <span
                    key={idx}
                    className="ingredient-badge"
                    data-type={ingredientType}
                  >
                    <span className="text-xs">{ingredientEmoji}</span>
                    {ingredientName}
                  </span>
                );
              })}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

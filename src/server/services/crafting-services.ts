import type { Ingredient } from "@/features/ingredients/schemas/ingredient.schema";
import type { Recipe } from "@/features/recipes/schemas/recipe.schema";

export function validateIngredients(
  ingredientNames: string[],
  ingredients: Ingredient[],
): { isValid: boolean; errorMessage?: string } {
  for (const ingredientName of ingredientNames) {
    const ingredient = ingredients.find((i) => i.name === ingredientName);
    if (!ingredient) {
      return {
        isValid: false,
        errorMessage: `Ingredient "${ingredientName}" not found in inventory`,
      };
    }
    if (ingredient.quantity <= 0) {
      return {
        isValid: false,
        errorMessage: `Not enough "${ingredientName}" in inventory`,
      };
    }
  }
  return { isValid: true };
}

export function findMatchingRecipe(
  ingredientNames: string[],
  recipes: Recipe[],
): Recipe | undefined {
  const sortedIngredients = [...ingredientNames].sort();
  return recipes.find((recipe) => {
    const recipeIngredients = recipe.ingredients;
    const sortedRecipeIngredients = [...recipeIngredients].sort();

    return (
      sortedIngredients.length === sortedRecipeIngredients.length &&
      sortedIngredients.every(
        (ingredient, index) => ingredient === sortedRecipeIngredients[index],
      )
    );
  });
}

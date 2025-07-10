import { getAllIngredients } from "@/features/ingredients/queries";
import RecipesView from "@/features/recipes/components/recipes-view";
import { getAllRecipes } from "@/features/recipes/queries";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();
  const ingredients = await getAllIngredients();
  return <RecipesView recipes={recipes} ingredients={ingredients} />;
}

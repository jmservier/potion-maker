import RecipesView from "@/features/recipes/components/recipes-view";
import { getAllIngredients } from "@/server/db/queries/ingredients";
import { getAllRecipes } from "@/server/db/queries/recipes";

export default async function RecipesPage() {
  const recipes = await getAllRecipes();
  const ingredients = await getAllIngredients();
  return <RecipesView recipes={recipes} ingredients={ingredients} />;
}

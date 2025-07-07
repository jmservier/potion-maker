import { getAllIngredients } from "@/queries/ingredients/getAllIngredients";
import CraftingView from "./crafting-view";

export default async function CraftingPage() {
  const ingredients = await getAllIngredients();
  return <CraftingView ingredients={ingredients} />;
}

import { getAllIngredients } from "@/server/db/queries/ingredients";
import CraftingView from "./crafting-view";

export default async function CraftingPage() {
  const ingredients = await getAllIngredients();
  return <CraftingView ingredients={ingredients} />;
}

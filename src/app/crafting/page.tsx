import CraftingView from "@/features/crafting/components/crafting-view";
import { getAllIngredients } from "@/server/db/queries/ingredients";

export default async function CraftingPage() {
  const ingredients = await getAllIngredients();
  return <CraftingView ingredients={ingredients} />;
}

import CraftingView from "@/features/crafting/components/crafting-view";
import { getAllIngredients } from "@/features/ingredients/queries";

export default async function CraftingPage() {
  const ingredients = await getAllIngredients();
  return <CraftingView ingredients={ingredients} />;
}

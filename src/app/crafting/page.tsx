import { getAllIngredients } from "@/server/db/queries/ingredients";
import CraftingView from "@/features/crafting/components/CraftingView";

export default async function CraftingPage() {
  const ingredients = await getAllIngredients();
  return <CraftingView ingredients={ingredients} />;
}

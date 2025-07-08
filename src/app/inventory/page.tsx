import { getAllIngredients } from "@/server/db/queries/ingredients";
import InventoryView from "@/features/ingredients/components/InventoryView";

export default async function InventoryPage() {
  const ingredients = await getAllIngredients();

  return <InventoryView initialIngredients={ingredients} />;
}

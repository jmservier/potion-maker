import InventoryView from "@/features/ingredients/components/inventory-view";
import { getAllIngredients } from "@/features/ingredients/queries";

export default async function InventoryPage() {
  const ingredients = await getAllIngredients();

  return <InventoryView initialIngredients={ingredients} />;
}

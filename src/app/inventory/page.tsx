import { getAllIngredients } from "@/queries/ingredients/getAllIngredients";
import InventoryView from "./inventory-view";

export default async function InventoryPage() {
  const ingredients = await getAllIngredients();

  return <InventoryView initialIngredients={ingredients} />;
}

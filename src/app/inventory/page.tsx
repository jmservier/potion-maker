import { getAllIngredients } from "@/server/db/queries/ingredients";
import InventoryView from "./inventory-view";

export default async function InventoryPage() {
  const ingredients = await getAllIngredients();

  return <InventoryView initialIngredients={ingredients} />;
}

import { HistoryView } from "@/features/history/components/history-view";
import { getAllCraftingAttempts } from "@/server/db/queries/crafting";
import { getAllRecipes } from "@/server/db/queries/recipes";

export default async function HistoryPage() {
  const [attempts, recipes] = await Promise.all([
    getAllCraftingAttempts(),
    getAllRecipes(),
  ]);

  return <HistoryView initialAttempts={attempts} recipes={recipes} />;
}

import { HistoryView } from "@/features/history/components/history-view";
import { getAllCraftingAttempts } from "@/features/history/queries";
import { getAllRecipes } from "@/features/recipes/queries";

export default async function HistoryPage() {
  const [attempts, recipes] = await Promise.all([
    getAllCraftingAttempts(),
    getAllRecipes(),
  ]);

  return <HistoryView initialAttempts={attempts} recipes={recipes} />;
}

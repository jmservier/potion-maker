import { getAllIngredients } from "@/queries/ingredients/getAllIngredients";
import PotionMakerView from "./potion-maker-view";

export default async function PotionMaker() {
  const ingredients = await getAllIngredients();
  return <PotionMakerView ingredients={ingredients} />;
}

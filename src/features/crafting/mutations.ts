import { Ingredient } from "@/schemas";

const BREWING_ANIMATION_DURATION = 3000; // 3 seconds for demo

export const brewPotionMutation = async (ingredients: Ingredient[]) => {
  const ingredientNames = ingredients.map((ingredient) => ingredient.name);

  const [response] = await Promise.all([
    fetch("/api/recipes/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ingredientNames }),
    }),
    // Demo delay to showcase the brewing animation
    new Promise((resolve) => setTimeout(resolve, BREWING_ANIMATION_DURATION)),
  ]);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Failed to brew potion");
  }

  return data;
};

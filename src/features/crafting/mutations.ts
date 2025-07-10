import { Ingredient } from "@/schemas";

const BREWING_ANIMATION_DURATION = 1500; // 1.5 seconds for demo

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

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to brew potion");
  }

  const data = await response.json();
  return data;
};

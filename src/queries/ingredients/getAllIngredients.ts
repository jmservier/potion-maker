import { Ingredient } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getAllIngredients(): Promise<Ingredient[]> {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return ingredients;
  } catch (error) {
    console.error("Failed to fetch ingredients", error);
    throw new Error("Failed to fetch ingredients");
  }
}

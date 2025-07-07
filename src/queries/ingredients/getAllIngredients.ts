import { Ingredient } from "@prisma/client";
import prisma from "@/lib/prisma";

export async function getAllIngredients(): Promise<Ingredient[]> {
  try {
    const ingredients = await prisma.ingredient.findMany();
    return ingredients;
  } catch (error) {
    throw new Error("Failed to fetch ingredients");
  }
}

import { Ingredient } from "@prisma/client";
import prisma from "@/lib/db";

export async function getAllIngredients(): Promise<Ingredient[]> {
  const ingredients = await prisma.ingredient.findMany({
    orderBy: {
      name: "asc",
    },
  });
  return ingredients;
}

export async function getIngredientById(
  id: string,
): Promise<Ingredient | null> {
  return prisma.ingredient.findUnique({
    where: { id },
  });
}

export async function getIngredientsByNames(
  names: string[],
): Promise<Ingredient[]> {
  return prisma.ingredient.findMany({
    where: {
      name: {
        in: names,
      },
    },
  });
}

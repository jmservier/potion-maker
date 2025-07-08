import { Ingredient } from "@prisma/client";
import prisma from "@/server/db/client";

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

export async function createIngredient(
  name: string,
  quantity: number,
): Promise<Ingredient> {
  return prisma.ingredient.create({
    data: {
      name,
      quantity,
    },
  });
}

export async function updateIngredient(
  id: string,
  data: { name?: string; quantity?: number },
): Promise<Ingredient> {
  return prisma.ingredient.update({
    where: { id },
    data,
  });
}

export async function decrementIngredientQuantity(
  name: string,
): Promise<Ingredient> {
  return prisma.ingredient.update({
    where: { name },
    data: {
      quantity: {
        decrement: 1,
      },
    },
  });
}

export async function deleteIngredient(id: string): Promise<Ingredient> {
  return prisma.ingredient.delete({
    where: { id },
  });
}

export async function resetAllIngredientQuantities(): Promise<void> {
  await prisma.ingredient.updateMany({
    data: {
      quantity: 10,
    },
  });
}

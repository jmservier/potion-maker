import { Ingredient, Prisma } from "@prisma/client";
import prisma from "@/lib/db";

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
  tx?: Prisma.TransactionClient,
): Promise<Ingredient> {
  const client = tx || prisma;
  return client.ingredient.update({
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

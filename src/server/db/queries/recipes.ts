import { Recipe } from "@prisma/client";
import prisma from "@/server/db/client";

export async function getAllRecipes(): Promise<Recipe[]> {
  return prisma.recipe.findMany();
}

export async function updateRecipeDiscovered(id: string): Promise<Recipe> {
  return prisma.recipe.update({
    where: { id },
    data: {
      discovered: true,
    },
  });
}

export async function resetAllRecipes(): Promise<void> {
  await prisma.recipe.updateMany({
    where: {
      discovered: true,
    },
    data: {
      discovered: false,
    },
  });
}

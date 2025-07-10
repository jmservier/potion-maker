import { Recipe } from "@prisma/client";
import prisma from "@/lib/db";

export async function getAllRecipes(): Promise<Recipe[]> {
  return prisma.recipe.findMany();
}

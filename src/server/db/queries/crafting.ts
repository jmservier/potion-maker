import { CraftingAttempt } from "@prisma/client";
import prisma from "@/server/db/client";

export async function getAllCraftingAttempts(): Promise<CraftingAttempt[]> {
  return prisma.craftingAttempt.findMany();
}

export async function createCraftingAttempt(
  recipeName: string,
  success: boolean,
): Promise<CraftingAttempt> {
  return prisma.craftingAttempt.create({
    data: {
      recipeName,
      success,
    },
  });
}

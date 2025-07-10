import { CraftingAttempt } from "@prisma/client";
import prisma from "@/lib/db";

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

export async function clearCraftingHistory(): Promise<void> {
  await prisma.craftingAttempt.deleteMany();
}

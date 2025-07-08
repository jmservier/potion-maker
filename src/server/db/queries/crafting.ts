import { Potion } from "@prisma/client";
import prisma from "@/server/db/client";

export async function getAllPotions(): Promise<Potion[]> {
  return prisma.potion.findMany();
}

export async function createPotion(
  recipeName: string,
  success: boolean,
): Promise<Potion> {
  return prisma.potion.create({
    data: {
      recipeName,
      success,
    },
  });
}

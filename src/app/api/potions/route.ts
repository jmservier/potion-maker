import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { PotionSchema } from "@/schemas";

export async function GET() {
  try {
    const potions = await prisma.potion.findMany();
    const validatedPotions = potions.map((potion) =>
      PotionSchema.parse(potion),
    );
    return NextResponse.json(validatedPotions);
  } catch (error) {
    console.error("Failed to fetch potions", error);
    return NextResponse.json(
      { error: "Failed to fetch potions" },
      { status: 500 },
    );
  }
}

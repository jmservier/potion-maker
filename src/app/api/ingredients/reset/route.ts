import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { ResetInventoryResponseSchema } from "@/shared/schemas";

export async function POST() {
  try {
    await prisma.ingredient.updateMany({
      data: { quantity: 10 },
    });

    const response = ResetInventoryResponseSchema.parse({
      message: "Inventory reset to 10 for all ingredients.",
    });

    return NextResponse.json(response);
  } catch (error) {
    console.error("Failed to reset inventory", error);
    return NextResponse.json(
      { error: "Failed to reset inventory." },
      { status: 500 },
    );
  }
}

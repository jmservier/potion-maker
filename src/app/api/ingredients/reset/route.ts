import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.ingredient.updateMany({
      data: { quantity: 10 },
    });
    return NextResponse.json({
      message: "Inventory reset to 10 for all ingredients.",
    });
  } catch (error) {
    console.error("Failed to reset inventory", error);
    return NextResponse.json(
      { error: "Failed to reset inventory." },
      { status: 500 },
    );
  }
}

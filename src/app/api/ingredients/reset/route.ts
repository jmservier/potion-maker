import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST() {
  try {
    await prisma.ingredient.updateMany({
      data: { quantity: 10 },
    });
    return NextResponse.json({
      message: "Inventory reset to 10 for all ingredients.",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to reset inventory." },
      { status: 500 },
    );
  }
}

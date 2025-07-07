import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function POST() {
  try {
    await prisma.recipe.updateMany({
      where: { discovered: true },
      data: { discovered: false },
    });

    return NextResponse.json({
      success: true,
      message: "Recipes reset",
    });
  } catch (error) {
    console.error("Failed to reset recipes", error);
    return NextResponse.json(
      { error: "Failed to reset recipes" },
      { status: 500 },
    );
  }
}

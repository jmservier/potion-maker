import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

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
    return NextResponse.json(
      { error: "Failed to reset recipes" },
      { status: 500 },
    );
  }
}

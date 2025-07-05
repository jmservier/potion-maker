import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const recipes = await prisma.recipe.findMany();
    return NextResponse.json(recipes);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch recipes" },
      { status: 500 },
    );
  }
}

import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET() {
  try {
    const ingredients = await prisma.ingredient.findMany({
      orderBy: {
        name: "asc",
      },
    });
    return NextResponse.json(ingredients);
  } catch {
    return NextResponse.json(
      { error: "Failed to fetch ingredients" },
      { status: 500 },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, quantity } = body;

    if (!name || quantity === undefined) {
      return NextResponse.json(
        { error: "Name and quantity are required" },
        { status: 400 },
      );
    }

    const ingredient = await prisma.ingredient.create({
      data: {
        name,
        quantity,
      },
    });

    return NextResponse.json(ingredient, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 },
    );
  }
}

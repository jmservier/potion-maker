import { NextResponse } from "next/server";
import { createIngredient } from "@/features/ingredients/actions";
import { getAllIngredients } from "@/features/ingredients/queries";
import { CreateIngredientSchema, IngredientSchema } from "@/schemas";

export async function GET() {
  try {
    const ingredients = await getAllIngredients();
    const validatedIngredients = ingredients.map((ingredient) =>
      IngredientSchema.parse(ingredient),
    );
    return NextResponse.json(validatedIngredients);
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
    const parseResult = CreateIngredientSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: parseResult.error.errors },
        { status: 400 },
      );
    }

    const { name, quantity } = parseResult.data;

    const ingredient = await createIngredient(name, quantity);

    const validatedIngredient = IngredientSchema.parse(ingredient);
    return NextResponse.json(validatedIngredient, { status: 201 });
  } catch {
    return NextResponse.json(
      { error: "Failed to create ingredient" },
      { status: 500 },
    );
  }
}

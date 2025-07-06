"use client";

import { useState } from "react";
import { Ingredient } from "@prisma/client";
import { IngredientsGrid } from "@/components/IngredientsGrid";
import { Cauldron } from "@/components/Cauldron";

export default function PotionMakerView({
  ingredients,
}: {
  ingredients: Ingredient[];
}) {
  const [selectedIngredients, setSelectedIngredients] = useState<Ingredient[]>(
    [],
  );

  const handleIngredientSelect = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) => {
      const isAlreadySelected = prev.some(
        (selected) => selected.id === ingredient.id,
      );
      if (isAlreadySelected) {
        return prev.filter((selected) => selected.id !== ingredient.id);
      } else {
        return [...prev, ingredient];
      }
    });
  };

  const handleRemoveIngredient = (ingredient: Ingredient) => {
    setSelectedIngredients((prev) =>
      prev.filter((selected) => selected.id !== ingredient.id),
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span>✨</span> Potion Maker<span>✨</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <IngredientsGrid
              ingredients={ingredients}
              selectedIngredients={selectedIngredients}
              onIngredientSelect={handleIngredientSelect}
            />
          </div>
          <div className="lg:col-span-1">
            <Cauldron
              selectedIngredients={selectedIngredients}
              onRemoveIngredient={handleRemoveIngredient}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

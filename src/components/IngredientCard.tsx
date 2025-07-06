"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Ingredient } from "@prisma/client";

interface IngredientCardProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onClick: () => void;
}

export function IngredientCard({
  ingredient,
  isSelected,
  onClick,
}: IngredientCardProps) {
  return (
    <Card
      onClick={onClick}
      className={`cursor-pointer transition-all duration-300 hover:scale-105 ${
        isSelected
          ? "bg-amber-500/50 border-amber-400 ring-2 ring-amber-400"
          : "bg-gray-800/50 border-gray-600/50 hover:border-amber-400/50"
      }`}
    >
      <CardContent className="p-4 text-center">
        <div className="text-3xl mb-2">🔮</div>
        <h3 className="font-semibold text-white text-sm mb-1">
          {ingredient.name}
        </h3>
      </CardContent>
    </Card>
  );
}

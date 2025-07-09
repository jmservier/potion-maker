"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Ingredient } from "@/schemas";

interface IngredientCardProps {
  ingredient: Ingredient;
  onClick: () => void;
  isSelected: boolean;
}

export function IngredientCard({
  ingredient,
  onClick,
  isSelected,
}: IngredientCardProps) {
  const isOutOfStock = ingredient.quantity <= 0;

  return (
    <Card
      onClick={isOutOfStock ? undefined : onClick}
      className={`ingredient-card cursor-pointer overflow-hidden py-0 ${
        isOutOfStock ? "cursor-not-allowed opacity-50" : ""
      } ${isSelected ? "selected" : ""}`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <Image
            src="https://geeksui.codescandy.com/geeks/assets/images/placeholder/placeholder-4by3.svg"
            alt={ingredient.name}
            className="ingredient-image"
            width={200}
            height={120}
            priority={false}
          />
          <div className="absolute right-2 top-2 rounded-full bg-white/90 px-2 py-1 backdrop-blur-sm">
            <span className="text-brown-dark text-sm font-bold">
              {ingredient.quantity}
            </span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="text-brown-dark mb-2 text-base font-bold">
            {ingredient.name}
          </h3>
          <p className="text-brown text-xs leading-relaxed">
            {ingredient.description}
          </p>
        </div>
      </CardContent>
    </Card>
  );
}

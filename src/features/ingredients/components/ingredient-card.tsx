import { Card, CardContent } from "@/components/ui/card";
import { getIngredientColor, getIngredientEmoji } from "@/lib/item-assets";
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
  const ingredientType = getIngredientColor(ingredient.name);
  const emoji = getIngredientEmoji(ingredient.name);

  return (
    <Card
      onClick={isOutOfStock ? undefined : onClick}
      className={`ingredient-card cursor-pointer overflow-hidden py-0 ${
        isOutOfStock ? "cursor-not-allowed opacity-50" : ""
      } ${isSelected ? "selected" : ""}`}
      data-type={ingredientType}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="ingredient-emoji-container">
            <span className="ingredient-emoji">{emoji}</span>
          </div>
          <div className="absolute right-1 top-1 rounded-full border border-white/20 bg-white/50 px-3 py-1 shadow-sm backdrop-blur-md">
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

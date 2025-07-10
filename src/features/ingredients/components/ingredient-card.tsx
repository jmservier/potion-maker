import { Card, CardContent } from "@/components/ui/card";
import { getIngredientColor, getIngredientEmoji } from "@/lib/item-assets";
import { Ingredient } from "@/schemas";

interface IngredientCardProps {
  ingredient: Ingredient;
  onClick: () => void;
  isSelected: boolean;
  tabIndex?: number;
}

export function IngredientCard({
  ingredient,
  onClick,
  isSelected,
  tabIndex = 0,
}: IngredientCardProps) {
  const isOutOfStock = ingredient.quantity <= 0;
  const ingredientType = getIngredientColor(ingredient.name);
  const emoji = getIngredientEmoji(ingredient.name);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === "Enter" || e.key === " ") && !isOutOfStock) {
      e.preventDefault();
      onClick();
    }
  };

  return (
    <Card
      onClick={isOutOfStock ? undefined : onClick}
      onKeyDown={handleKeyDown}
      className={`ingredient-card focus-ring cursor-pointer overflow-hidden py-0 ${
        isOutOfStock ? "cursor-not-allowed opacity-50" : ""
      } ${isSelected ? "selected" : ""}`}
      data-type={ingredientType}
      role="button"
      tabIndex={isOutOfStock ? -1 : tabIndex}
      aria-label={`${ingredient.name}, ${ingredient.quantity} available${isOutOfStock ? ", out of stock" : ""}${isSelected ? ", selected" : ""}`}
      aria-pressed={isSelected}
      aria-disabled={isOutOfStock}
      aria-describedby={`${ingredient.id}-description`}
    >
      <CardContent className="p-0">
        <div className="relative">
          <div className="ingredient-emoji-container">
            <span className="ingredient-emoji" aria-hidden="true">
              {emoji}
            </span>
          </div>
          <div
            className="absolute right-1 top-1 rounded-full border border-white/20 bg-white/50 px-3 py-1 shadow-sm backdrop-blur-md"
            aria-hidden="true"
          >
            <span className="text-sm font-bold">{ingredient.quantity}</span>
          </div>
        </div>
        <div className="p-4">
          <h3 className="mb-2 text-base font-bold">{ingredient.name}</h3>
          <p
            id={`${ingredient.id}-description`}
            className="text-brown text-xs leading-relaxed"
          >
            {ingredient.description}
          </p>
          {isOutOfStock && <span className="sr-only">Out of stock</span>}
        </div>
      </CardContent>
    </Card>
  );
}

import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Ingredient, Recipe } from "@/schemas";

interface RecipeCardProps {
  recipe: Recipe;
  ingredients: Ingredient[];
}

export function RecipeCard({ recipe, ingredients }: RecipeCardProps) {
  const getIngredientName = (ingredientName: string) => {
    const ingredient = ingredients.find((i) => i.name === ingredientName);
    return ingredient ? ingredient.name : ingredientName;
  };

  return (
    <Card className="ingredient-card rounded-t-lg py-0">
      <CardHeader className="p-0">
        <div className="relative h-40">
          <Image
            src="https://geeksui.codescandy.com/geeks/assets/images/placeholder/placeholder-4by3.svg"
            alt={recipe.name}
            fill
            className="rounded-t-lg object-cover"
            priority={false}
          />
        </div>
        <div className="p-4 pb-2">
          <CardTitle className="text-lg font-bold">{recipe.name}</CardTitle>
          <CardDescription className="text-sm">
            {recipe.description}
          </CardDescription>
        </div>
      </CardHeader>
      <CardContent className="px-4 pb-4">
        <div className="space-y-3">
          <h4 className="text-sm font-semibold text-muted-foreground">
            Ingrédients:
          </h4>
          <div className="flex flex-wrap gap-2">
            {recipe.ingredients.map((ingredientName, idx) => (
              <span
                key={idx}
                className="rounded-lg bg-secondary px-3 py-1.5 text-sm font-medium"
              >
                {getIngredientName(ingredientName)}
              </span>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

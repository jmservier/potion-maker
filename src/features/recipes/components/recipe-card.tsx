import Image from "next/image";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
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
    <Card className="ingredient-card gap-2 overflow-hidden py-0">
      <CardHeader className="p-0">
        <div className="relative">
          <Image
            src="https://i.ibb.co/3YBrZ719/Screenshot-2025-07-09-at-13-29-39.png"
            alt={recipe.name}
            width={400}
            height={240}
            className="h-48 w-full object-cover"
            priority={false}
          />
          <div className="absolute right-0 bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent p-4">
            <h3 className="text-xl font-bold text-white">{recipe.name}</h3>
          </div>
        </div>
      </CardHeader>
      <CardContent className="p-6">
        <p className="mb-6 text-sm leading-relaxed">
          {recipe.description}
        </p>

        <div className="space-y-3">
          <h4 className="text-sm font-bold">
            Recette :
          </h4>
          <div className="space-y-2">
            {recipe.ingredients.map((ingredientName, idx) => (
              <div
                key={idx}
                className="flex items-center gap-3 text-sm"
              >
                <span className="h-2 w-2 rounded-full"></span>
                {getIngredientName(ingredientName)}
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { getRecipeEmoji } from "@/lib/item-assets";
import { Recipe } from "@/schemas";

interface RecipeBookProps {
  recipes: Recipe[];
}

export function RecipeBook({ recipes }: RecipeBookProps) {
  const discoveredRecipes = recipes.filter((recipe) => recipe.discovered);

  return (
    <section className="rounded-2xl" aria-labelledby="recipe-book-heading">
      <h2 id="recipe-book-heading" className="mb-4 text-2xl font-bold">
        Potions récentes
      </h2>

      <div
        className="max-h-60 space-y-3 overflow-y-auto"
        role="region"
        aria-label="Recently discovered potions"
        tabIndex={discoveredRecipes.length > 3 ? 0 : -1}
      >
        {discoveredRecipes.length === 0 ? (
          <div className="py-8 text-center text-sm" role="status">
            Aucune recette découverte
          </div>
        ) : (
          <div
            className="space-y-3"
            role="list"
            aria-label={`${discoveredRecipes.length} recipes discovered`}
          >
            {discoveredRecipes.slice(-3).map((recipe) => (
              <div
                key={recipe.id}
                className="potion-bottle flex items-center gap-4 rounded-lg p-4"
                role="listitem"
              >
                <div className="text-3xl" aria-hidden="true">
                  {getRecipeEmoji(recipe.name)}
                </div>
                <div className="flex-1">
                  <div className="font-bold">{recipe.name}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <div className="sr-only" aria-live="polite">
        {discoveredRecipes.length > 0 &&
          `Total recipes discovered: ${discoveredRecipes.length}`}
      </div>
    </section>
  );
}

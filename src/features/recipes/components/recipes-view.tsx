import { BookOpen, Lock, Sparkles } from "lucide-react";
import { Ingredient, Recipe } from "@/schemas";
import { RecipeCard } from "./recipe-card";
import { UnknownRecipeCard } from "./unknown-recipe-card";

interface RecipesViewProps {
  recipes: Recipe[];
  ingredients: Ingredient[];
}

export default function RecipesView({
  recipes,
  ingredients,
}: RecipesViewProps) {
  const discoveredPotions = recipes.filter((potion) => potion.discovered);
  const undiscoveredPotions = recipes.filter((potion) => !potion.discovered);

  return (
    <div className="space-y-8 fade-in">
      <div className="glass-card warm-glow rounded-2xl p-8">
        <h2 className="gradient-text mb-6 flex items-center gap-4 text-4xl font-bold">
          <BookOpen size={40} />
          Collection de Recettes
        </h2>
        <p className="mb-6 text-lg leading-relaxed">
          Découvrez de nouvelles recettes de potions par l&apos;expérimentation
          et débloquez les secrets de l&apos;alchimie.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="mb-1 text-3xl font-bold text-green-600">
              {discoveredPotions.length}
            </div>
            <div className="text-sm">Découvertes</div>
          </div>
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="mb-1 text-3xl font-bold">
              {undiscoveredPotions.length}
            </div>
            <div className="text-sm">Inconnues</div>
          </div>
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="mb-1 text-3xl font-bold">
              {recipes.length > 0
                ? Math.round((discoveredPotions.length / recipes.length) * 100)
                : 0}
              %
            </div>
            <div className="text-sm">Complété</div>
          </div>
        </div>
      </div>

      {discoveredPotions.length > 0 && (
        <div className="glass-card warm-glow rounded-2xl p-8">
          <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
            <Sparkles />
            Recettes Découvertes
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {discoveredPotions.map((potion, index) => (
              <RecipeCard
                key={index}
                recipe={potion}
                ingredients={ingredients}
              />
            ))}
          </div>
        </div>
      )}

      <div className="glass-card warm-glow rounded-2xl p-8">
        <h2 className="mb-6 flex items-center gap-3 text-3xl font-bold">
          <Lock />
          Recettes Inconnues
        </h2>
        <p className="mb-6 leading-relaxed">
          Ces recettes restent à découvrir. Essayez différentes combinaisons
          d&apos;ingrédients pour les débloquer.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {undiscoveredPotions.map((potion, index) => (
            <UnknownRecipeCard key={index} />
          ))}
        </div>
      </div>
    </div>
  );
}

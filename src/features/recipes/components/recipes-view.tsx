import { BookOpen, Lock, Sparkles } from "lucide-react";
import { Navigation } from "@/common/components/navigation";
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
    <div className="min-h-screen" style={{ backgroundColor: "#faf8f0" }}>
      <div className="mx-auto max-w-7xl p-6">
        <div className="mb-8 text-center">
          <h1 className="mb-4 text-4xl font-bold text-white">
            <span>📜</span> Livre de Recettes <span>📜</span>
          </h1>
        </div>
        <Navigation />

        <div
          className="space-y-8"
          style={{ animation: "fade-in 0.3s ease-out" }}
        >
          <div
            className="rounded-2xl p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(222, 184, 135, 0.3)",
              boxShadow: "0 4px 20px rgba(222, 184, 135, 0.3)",
            }}
          >
            <h1
              className="mb-6 flex items-center gap-4 text-4xl font-bold"
              style={{
                background: "linear-gradient(135deg, #a0522d 0%, #8b4513 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              <BookOpen style={{ color: "#a0522d" }} size={40} />
              Collection de Recettes
            </h1>
            <p
              className="mb-6 text-lg leading-relaxed"
              style={{ color: "#a0522d" }}
            >
              Découvrez de nouvelles recettes de potions par
              l&apos;expérimentation et débloquez les secrets de
              l&apos;alchimie.
            </p>

            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.6) 100%)",
                  border: "1px solid rgba(210, 180, 140, 0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <div className="mb-1 text-3xl font-bold text-green-600">
                  {discoveredPotions.length}
                </div>
                <div className="text-sm" style={{ color: "#a0522d" }}>
                  Découvertes
                </div>
              </div>
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.6) 100%)",
                  border: "1px solid rgba(210, 180, 140, 0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  className="mb-1 text-3xl font-bold"
                  style={{ color: "#8b4513" }}
                >
                  {undiscoveredPotions.length}
                </div>
                <div className="text-sm" style={{ color: "#a0522d" }}>
                  Inconnues
                </div>
              </div>
              <div
                className="rounded-xl p-6 text-center"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.6) 100%)",
                  border: "1px solid rgba(210, 180, 140, 0.3)",
                  transition: "all 0.2s ease",
                }}
              >
                <div
                  className="mb-1 text-3xl font-bold"
                  style={{ color: "#a0522d" }}
                >
                  {recipes.length > 0
                    ? Math.round(
                        (discoveredPotions.length / recipes.length) * 100,
                      )
                    : 0}
                  %
                </div>
                <div className="text-sm" style={{ color: "#a0522d" }}>
                  Complété
                </div>
              </div>
            </div>
          </div>

          {discoveredPotions.length > 0 && (
            <div
              className="rounded-2xl p-8"
              style={{
                background:
                  "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)",
                backdropFilter: "blur(10px)",
                border: "1px solid rgba(222, 184, 135, 0.3)",
                boxShadow: "0 4px 20px rgba(222, 184, 135, 0.3)",
              }}
            >
              <h2
                className="mb-6 flex items-center gap-3 text-3xl font-bold"
                style={{ color: "#8b4513" }}
              >
                <Sparkles style={{ color: "#a0522d" }} />
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

          <div
            className="rounded-2xl p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(255, 248, 240, 0.95) 0%, rgba(245, 230, 211, 0.9) 100%)",
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(222, 184, 135, 0.3)",
              boxShadow: "0 4px 20px rgba(222, 184, 135, 0.3)",
            }}
          >
            <h2
              className="mb-6 flex items-center gap-3 text-3xl font-bold"
              style={{ color: "#8b4513" }}
            >
              <Lock style={{ color: "#8b4513" }} />
              Recettes Inconnues
            </h2>
            <p className="mb-6 leading-relaxed" style={{ color: "#a0522d" }}>
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
      </div>
    </div>
  );
}

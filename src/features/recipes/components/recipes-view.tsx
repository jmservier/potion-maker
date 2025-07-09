"use client";

import { BookOpen, Lock, Sparkles } from "lucide-react";
import { Navigation } from "@/common/components/navigation";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Ingredient, Recipe } from "@/schemas";

interface ExtendedPotion extends Recipe {
  emoji: string;
  description: string;
}

interface RecipesViewProps {
  recipes: Recipe[];
  ingredients: Ingredient[];
}

//TODO: move to db
const potionData: Record<string, { emoji: string; description: string }> = {
  "Potion d'invisibilité": {
    emoji: "👻",
    description:
      "Une potion mystérieuse qui rend invisible pendant quelques heures.",
  },
  "Potion d'amour": {
    emoji: "💕",
    description: "Une potion rosée qui inspire l'amour et l'affection.",
  },
  "Potion de jeunesse": {
    emoji: "🌟",
    description: "Une potion dorée qui restaure la jeunesse et la vitalité.",
  },
  "Potion d'immortalité": {
    emoji: "⚡",
    description:
      "La potion ultime qui confère l'immortalité à celui qui la boit.",
  },
  "Potion de Clairvoyance": {
    emoji: "👁️",
    description: "Une potion bleue qui permet de voir l'avenir et le passé.",
  },
  "Potion de Force": {
    emoji: "💪",
    description:
      "Une potion rouge qui augmente considérablement la force physique.",
  },
  "Potion de Vitesse": {
    emoji: "⚡",
    description:
      "Une potion verte qui permet de se déplacer à une vitesse surhumaine.",
  },
  "Potion de Guérison": {
    emoji: "🧪",
    description:
      "Une potion curative qui soigne toutes les blessures et maladies.",
  },
  "Potion de Transformation": {
    emoji: "🔄",
    description:
      "Une potion changeante qui permet de prendre l'apparence d'autrui.",
  },
};

export default function RecipesView({
  recipes,
  ingredients,
}: RecipesViewProps) {
  const getIngredientName = (ingredientName: string) => {
    const ingredient = ingredients.find((i) => i.name === ingredientName);
    return ingredient ? ingredient.name : ingredientName;
  };

  const allPotions: ExtendedPotion[] = recipes.map((recipe) => ({
    ...recipe,
    emoji: potionData[recipe.name]?.emoji || "🧪",
    description:
      potionData[recipe.name]?.description ||
      "Une potion mystérieuse aux effets inconnus.",
  }));

  const discoveredPotions = allPotions.filter((potion) => potion.discovered);
  const undiscoveredPotions = allPotions.filter((potion) => !potion.discovered);

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
                  {allPotions.length > 0
                    ? Math.round(
                        (discoveredPotions.length / allPotions.length) * 100,
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

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {discoveredPotions.map((potion, index) => (
                  <Card
                    key={index}
                    style={{
                      background:
                        "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(255, 248, 240, 0.8) 100%)",
                      border: "1px solid rgba(210, 180, 140, 0.4)",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="text-4xl">{potion.emoji}</div>
                      </div>
                      <CardTitle
                        className="text-xl font-bold"
                        style={{ color: "#8b4513" }}
                      >
                        {potion.name}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p
                        className="mb-6 text-sm leading-relaxed"
                        style={{ color: "#a0522d" }}
                      >
                        {potion.description}
                      </p>

                      <div className="space-y-3">
                        <h4
                          className="text-sm font-bold"
                          style={{ color: "#8b4513" }}
                        >
                          Recette :
                        </h4>
                        <div className="space-y-2">
                          {potion.ingredients.map((ingredientName, idx) => (
                            <div
                              key={idx}
                              className="flex items-center gap-3 text-sm"
                              style={{ color: "#8b4513" }}
                            >
                              <span
                                className="h-2 w-2 rounded-full"
                                style={{ backgroundColor: "#a0522d" }}
                              ></span>
                              {getIngredientName(ingredientName)}
                            </div>
                          ))}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
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
                <Card
                  key={index}
                  className="opacity-75"
                  style={{
                    background: "#faf8f0",
                    border: "1px solid rgba(222, 184, 135, 0.3)",
                  }}
                >
                  <CardHeader>
                    <div className="flex justify-center">
                      <div className="text-6xl opacity-50">❓</div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p
                      className="text-center text-sm leading-relaxed"
                      style={{ color: "#a0522d" }}
                    >
                      Une recette mystérieuse à découvrir...
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

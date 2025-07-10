"use client";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { CheckCircle, History, RotateCcw, XCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import type { CraftingAttempt, Recipe } from "@/schemas";

interface HistoryViewProps {
  initialAttempts: CraftingAttempt[];
  recipes: Recipe[];
}

interface ExtendedCraftingAttempt extends CraftingAttempt {
  ingredients: string[];
  potionName?: string;
  potionEmoji?: string;
}

export function HistoryView({ initialAttempts, recipes }: HistoryViewProps) {
  const queryClient = useQueryClient();

  const { data: attempts = [] } = useQuery({
    queryKey: ["crafting-attempts"],
    queryFn: async () => {
      const response = await fetch("/api/crafting");
      if (!response.ok) throw new Error("Failed to fetch attempts");
      const data = await response.json();
      return extendAttemptsWithIngredients(data);
    },
    initialData: () => extendAttemptsWithIngredients(initialAttempts),
  });

  const clearHistoryMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/crafting/clear", {
        method: "POST",
      });
      if (!response.ok) throw new Error("Failed to clear history");
      return response.json();
    },
    onSuccess: () => {
      queryClient.setQueryData(["crafting-attempts"], []);
      toast.success("Historique effacé");
    },
    onError: () => {
      toast.error("Échec de l'effacement de l'historique");
    },
  });

  function extendAttemptsWithIngredients(
    attempts: CraftingAttempt[],
  ): ExtendedCraftingAttempt[] {
    return attempts.map((attempt) => {
      const recipe = recipes.find((r) => r.name === attempt.recipeName);
      const extendedAttempt: ExtendedCraftingAttempt = {
        ...attempt,
        ingredients: recipe?.ingredients || [],
        potionName: recipe?.name,
        potionEmoji: "🧪",
      };
      return extendedAttempt;
    });
  }

  const successfulAttempts = attempts.filter((attempt) => attempt.success);
  const failedAttempts = attempts.filter((attempt) => !attempt.success);
  const uniquePotions = new Set(
    successfulAttempts.map((attempt) => attempt.potionName).filter(Boolean),
  );

  return (
    <div className="space-y-8 fade-in">
      <div className="glass-card warm-glow rounded-2xl p-8">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="flex items-center gap-4 text-3xl font-bold">
            <History className="text-brown" size={40} />
            Historique de mixage
          </h1>
          {attempts.length > 0 && (
            <Button
              onClick={() => clearHistoryMutation.mutate()}
              variant="outline"
              className="border-orange text-brown hover:bg-orange/10 rounded-xl bg-transparent"
              disabled={clearHistoryMutation.isPending}
            >
              <RotateCcw size={16} className="mr-2" />
              Effacer l&apos;historique
            </Button>
          )}
        </div>

        <p className="text-brown mb-6 text-lg">
          Suivez vos progrès de mixage et apprenez de vos tentatives passées.
        </p>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="mb-1 text-3xl font-bold">{attempts.length}</div>
            <div className="text-brown text-sm">Tentatives totales</div>
          </div>
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="mb-1 text-3xl font-bold text-green-600">
              {successfulAttempts.length}
            </div>
            <div className="text-brown text-sm">Réussies</div>
          </div>
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="mb-1 text-3xl font-bold text-red-500">
              {failedAttempts.length}
            </div>
            <div className="text-brown text-sm">Échouées</div>
          </div>
          <div className="stats-card rounded-xl p-6 text-center">
            <div className="text-brown mb-1 text-3xl font-bold">
              {uniquePotions.size}
            </div>
            <div className="text-brown text-sm">Potions uniques</div>
          </div>
        </div>
      </div>

      {attempts.length > 0 ? (
        <div className="glass-card warm-glow rounded-2xl p-8">
          <h2 className="mb-6 text-3xl font-bold">Activité Récente</h2>

          <ScrollArea className="border-orange/20 h-[500px] rounded-xl border bg-white/50">
            <div className="space-y-3 p-4">
              {attempts
                .slice()
                .reverse()
                .map((attempt) => (
                  <Card
                    key={attempt.id}
                    className={`transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg ${
                      attempt.success
                        ? "border-green-200 bg-green-50/30"
                        : "border-red-200 bg-red-50/30"
                    }`}
                  >
                    <CardContent className="p-4">
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              {attempt.success ? (
                                <CheckCircle
                                  className="text-green-600"
                                  size={18}
                                />
                              ) : (
                                <XCircle className="text-red-500" size={18} />
                              )}
                              {attempt.success &&
                              attempt.potionName &&
                              attempt.potionEmoji ? (
                                <div className="flex items-center gap-2">
                                  <span className="animate__animated animate__heartBeat animate__slower text-xl">
                                    {attempt.potionEmoji}
                                  </span>
                                  <span className="text-sm font-bold">
                                    {attempt.potionName}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm font-semibold">
                                  Tentative échouée
                                </span>
                              )}
                            </div>
                            <span className="text-brown text-xs">
                              {new Date(attempt.createdAt).toLocaleString(
                                "fr-FR",
                                {
                                  day: "numeric",
                                  month: "short",
                                  hour: "2-digit",
                                  minute: "2-digit",
                                },
                              )}
                            </span>
                          </div>

                          {attempt.ingredients.length > 0 && (
                            <div className="bg-orange/5 rounded-lg p-2">
                              <div className="text-brown mb-1.5 text-xs font-semibold">
                                Ingrédients utilisés :
                              </div>
                              <div className="flex flex-wrap gap-1.5">
                                {attempt.ingredients.map(
                                  (ingredientName, idx) => (
                                    <span
                                      key={idx}
                                      className="border-orange/30 text-brown from-orange/10 to-yellow/10 hover:from-orange/20 hover:to-yellow/20 cursor-default rounded-full border bg-gradient-to-r px-2 py-1 text-xs font-medium transition-all duration-200"
                                    >
                                      {ingredientName}
                                    </span>
                                  ),
                                )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
            </div>
          </ScrollArea>
        </div>
      ) : (
        <div className="glass-card warm-glow rounded-2xl p-8 text-center">
          <div className="mb-4 text-6xl opacity-50">📋</div>
          <h2 className="mb-3 text-2xl font-semibold">
            Pas d&apos;historique encore
          </h2>
          <p className="text-brown">
            Commencez à brasser des potions pour voir vos tentatives
            enregistrées ici.
          </p>
        </div>
      )}

      {attempts.length > 0 && (
        <div className="glass-card warm-glow rounded-2xl p-8">
          <h2 className="mb-6 text-3xl font-bold">Statistiques</h2>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div>
              <h3 className="mb-4 text-xl font-bold">Taux de réussite</h3>
              <div className="border-orange/30 rounded-xl border bg-white p-6">
                <div className="mb-3 flex items-center justify-between">
                  <span className="text-brown">Taux de réussite global</span>
                  <span className="text-lg font-bold text-green-600">
                    {attempts.length > 0
                      ? Math.round(
                          (successfulAttempts.length / attempts.length) * 100,
                        )
                      : 0}
                    %
                  </span>
                </div>
                <div className="bg-cream h-3 w-full rounded-full">
                  <div
                    className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
                    style={{
                      width: `${
                        attempts.length > 0
                          ? (successfulAttempts.length / attempts.length) * 100
                          : 0
                      }%`,
                    }}
                  ></div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-xl font-bold">
                Ingrédients les plus utilisés
              </h3>
              <div className="border-orange/30 rounded-xl border bg-white p-6">
                {(() => {
                  const ingredientCount: { [key: string]: number } = {};
                  attempts.forEach((attempt) => {
                    attempt.ingredients.forEach((ingredientName) => {
                      ingredientCount[ingredientName] =
                        (ingredientCount[ingredientName] || 0) + 1;
                    });
                  });

                  const sortedIngredients = Object.entries(ingredientCount)
                    .sort(([, a], [, b]) => b - a)
                    .slice(0, 3);

                  return sortedIngredients.length > 0 ? (
                    <div className="space-y-3">
                      {sortedIngredients.map(([ingredientName, count]) => (
                        <div
                          key={ingredientName}
                          className="flex items-center justify-between"
                        >
                          <span className="text-brown text-sm">
                            {ingredientName}
                          </span>
                          <span className="text-brown font-bold">{count}×</span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-brown text-sm">
                      Aucune donnée disponible
                    </div>
                  );
                })()}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

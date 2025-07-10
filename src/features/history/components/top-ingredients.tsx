interface TopIngredientsProps {
  attempts: Array<{
    ingredients: string[];
  }>;
}

export function TopIngredients({ attempts }: TopIngredientsProps) {
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

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Ingrédients les plus utilisés</h3>
      <div className="border-orange/30 rounded-xl border bg-white p-6">
        {sortedIngredients.length > 0 ? (
          <div className="space-y-3">
            {sortedIngredients.map(([ingredientName, count]) => (
              <div
                key={ingredientName}
                className="flex items-center justify-between"
              >
                <span className="text-sm">{ingredientName}</span>
                <span className="font-bold">{count}×</span>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-sm">Aucune donnée disponible</div>
        )}
      </div>
    </div>
  );
}

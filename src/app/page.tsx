import { Card, CardContent } from "@/components/ui/card";
import { Ingredient } from "@prisma/client";

export async function getIngredients(): Promise<Ingredient[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/ingredients`,
  );
  const data = await response.json();
  return data;
}

export default async function Home() {
  const ingredients = await getIngredients();

  const getRandomEmoji = () => {
    const emojis = [
      "🧙‍♂️",
      "✨",
      "🔮",
      "💫",
      "🌟",
      "🌈",
      "💥",
      "💦",
      "🔥",
      "💭",
      "💰",
      "💎",
      "💍",
    ];
    return emojis[Math.floor(Math.random() * emojis.length)];
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-950 via-green-900 to-amber-950 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            <span>✨</span> Potion Maker<span>✨</span>
          </h1>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
              <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                <span>🧙‍♂️</span> Ingredients
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4">
                {ingredients.map((ingredient) => (
                  <Card
                    key={ingredient.id}
                    className="cursor-pointer transition-all duration-300 hover:scale-105 bg-gray-800/50 border-gray-600/50 hover:border-amber-400/50"
                  >
                    <CardContent className="p-4 text-center">
                      <div className="text-3xl mb-2">{getRandomEmoji()}</div>
                      <h3 className="font-semibold text-white text-sm mb-1">
                        {ingredient.name}
                      </h3>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
              <div className="lg:col-span-1">
                <div className="bg-black/30 backdrop-blur-sm rounded-xl p-6 border border-amber-500/30">
                  <h2 className="text-2xl font-bold text-white mb-4 flex items-center gap-2">
                    <span>🧙‍♂️</span> Chaudron
                  </h2>
                  dropzone
                </div>
              </div>
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

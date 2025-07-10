import { CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface AttemptCardProps {
  attempt: {
    id: string;
    success: boolean;
    createdAt: Date;
    ingredients: string[];
    potionName?: string;
    potionEmoji?: string;
  };
}

export function AttemptCard({ attempt }: AttemptCardProps) {
  return (
    <Card
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
                  <CheckCircle className="text-green-600" size={18} />
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
              <span className="text-xs">
                {new Date(attempt.createdAt).toLocaleString("fr-FR", {
                  day: "numeric",
                  month: "short",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </span>
            </div>

            {attempt.ingredients.length > 0 && (
              <div className="bg-orange/5 rounded-lg p-2">
                <div className="mb-1.5 text-xs font-semibold">
                  Ingrédients utilisés :
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {attempt.ingredients.map((ingredientName, idx) => (
                    <span
                      key={idx}
                      className="border-orange/30 from-orange/10 to-yellow/10 hover:from-orange/20 hover:to-yellow/20 cursor-default rounded-full border bg-gradient-to-r px-2 py-1 text-xs font-medium transition-all duration-200"
                    >
                      {ingredientName}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

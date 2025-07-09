import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UnknownRecipeCard() {
  return (
    <Card className="bg-cream border-orange/30 opacity-75">
      <CardHeader>
        <div className="flex justify-center">
          <div className="text-6xl opacity-50">❓</div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-center text-sm leading-relaxed">
          Une recette mystérieuse à découvrir...
        </p>
      </CardContent>
    </Card>
  );
}

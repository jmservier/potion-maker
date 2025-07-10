import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UnknownRecipeCard() {
  return (
    <Card className="group min-h-[280px] border-2 border-dashed border-gray-300 bg-gradient-to-br from-gray-50/50 to-gray-100/30 opacity-75 transition-all duration-300 hover:opacity-90 hover:shadow-md">
      <CardHeader className="pb-4 pt-8">
        <div className="flex justify-center">
          <div className="animate-pulse text-6xl opacity-50 transition-transform duration-300 group-hover:scale-110">
            ❓
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-8">
        <p className="text-center text-sm leading-relaxed text-muted-foreground">
          Une recette mystérieuse à découvrir...
        </p>
      </CardContent>
    </Card>
  );
}

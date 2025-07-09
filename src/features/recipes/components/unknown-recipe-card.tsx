import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function UnknownRecipeCard() {
  return (
    <Card
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
  );
}

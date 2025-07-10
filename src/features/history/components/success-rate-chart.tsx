interface SuccessRateChartProps {
  totalAttempts: number;
  successfulAttempts: number;
}

export function SuccessRateChart({
  totalAttempts,
  successfulAttempts,
}: SuccessRateChartProps) {
  const successRate =
    totalAttempts > 0
      ? Math.round((successfulAttempts / totalAttempts) * 100)
      : 0;

  return (
    <div>
      <h3 className="mb-4 text-xl font-bold">Taux de réussite</h3>
      <div className="border-orange/30 rounded-xl border bg-white p-6">
        <div className="mb-3 flex items-center justify-between">
          <span className="">Taux de réussite global</span>
          <span className="text-lg font-bold text-green-600">
            {successRate}%
          </span>
        </div>
        <div className="bg-cream h-3 w-full rounded-full">
          <div
            className="h-3 rounded-full bg-gradient-to-r from-green-500 to-green-400 transition-all duration-500"
            style={{
              width: `${successRate}%`,
            }}
          />
        </div>
      </div>
    </div>
  );
}

interface HistoryStatsProps {
  totalAttempts: number;
  successfulAttempts: number;
  failedAttempts: number;
  uniquePotions: number;
}

export function HistoryStats({
  totalAttempts,
  successfulAttempts,
  failedAttempts,
  uniquePotions,
}: HistoryStatsProps) {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-4">
      <div className="stats-card rounded-xl p-6 text-center">
        <div className="mb-1 text-3xl font-bold">{totalAttempts}</div>
        <div className="text-sm">Tentatives totales</div>
      </div>
      <div className="stats-card rounded-xl p-6 text-center">
        <div className="mb-1 text-3xl font-bold text-green-600">
          {successfulAttempts}
        </div>
        <div className="text-sm">Réussies</div>
      </div>
      <div className="stats-card rounded-xl p-6 text-center">
        <div className="mb-1 text-3xl font-bold text-red-500">
          {failedAttempts}
        </div>
        <div className="text-sm">Échouées</div>
      </div>
      <div className="stats-card rounded-xl p-6 text-center">
        <div className="mb-1 text-3xl font-bold">{uniquePotions}</div>
        <div className="text-sm">Potions uniques</div>
      </div>
    </div>
  );
}

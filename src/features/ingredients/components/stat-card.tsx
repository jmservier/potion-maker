interface StatCardProps {
  value: number | string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div className="stats-card rounded-xl p-6 text-center">
      <div className="mb-1 text-3xl font-bold">{value}</div>
      <div className="text-sm">{label}</div>
    </div>
  );
}

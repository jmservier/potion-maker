interface StatCardProps {
  value: number | string;
  label: string;
}

export function StatCard({ value, label }: StatCardProps) {
  return (
    <div
      className="rounded-xl p-6 text-center"
      style={{
        background:
          "linear-gradient(135deg, rgba(255, 255, 255, 0.9) 0%, rgba(245, 230, 211, 0.6) 100%)",
        border: "1px solid rgba(210, 180, 140, 0.3)",
        transition: "all 0.2s ease",
      }}
    >
      <div className="mb-1 text-3xl font-bold" style={{ color: "#8b4513" }}>
        {value}
      </div>
      <div className="text-sm" style={{ color: "#a0522d" }}>
        {label}
      </div>
    </div>
  );
}

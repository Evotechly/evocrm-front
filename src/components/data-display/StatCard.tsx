import type { ReactNode } from 'react';
export function StatCard({
  label,
  value,
  change,
  icon,
  tone = 'orange',
  monetary = false,
}: {
  label: string;
  value: string;
  change: string;
  icon: ReactNode;
  tone?: string;
  monetary?: boolean;
}) {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${tone}`}>{icon}</div>
      <div className="stat-copy">
        <span>{label}</span>
        <strong className={monetary ? 'money' : undefined}>{value}</strong>
        <small className={change.startsWith('+') ? 'positive' : ''}>{change}</small>
      </div>
    </div>
  );
}

export { StatCard as KPICard };

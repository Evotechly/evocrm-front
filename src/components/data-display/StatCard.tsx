import type { ReactNode } from 'react';
export function StatCard({ label, value, change, icon, tone = 'orange' }: { label: string; value: string; change: string; icon: ReactNode; tone?: string }) {
  return <div className="stat-card"><div className={`stat-icon ${tone}`}>{icon}</div><div className="stat-copy"><span>{label}</span><strong>{value}</strong><small className={change.startsWith('+') ? 'positive' : ''}>{change}</small></div></div>;
}

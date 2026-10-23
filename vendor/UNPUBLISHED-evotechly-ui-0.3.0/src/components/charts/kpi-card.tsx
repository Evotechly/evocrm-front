import * as React from "react";
import { EvoCard, EvoCardDescription, EvoCardTitle } from "../layout/card";

export function EvoKpiCard({
  label,
  value,
  delta,
}: {
  label: string;
  value: string;
  delta?: string;
}) {
  return (
    <EvoCard data-evo="kpi-card">
      <EvoCardDescription>{label}</EvoCardDescription>
      <EvoCardTitle className="evo-stat-value">{value}</EvoCardTitle>
      {delta ? <p className="tabular-nums">{delta}</p> : null}
    </EvoCard>
  );
}

export const KpiCard = EvoKpiCard;
export const StatCard = EvoKpiCard;

import * as React from "react";
import { EvoCard, EvoCardTitle } from "../layout/card";
import { EvoButton } from "../foundations/button";

export function EvoPricingTable({
  plans,
}: {
  plans: { id: string; name: string; price: string; features?: string[] }[];
}) {
  return (
    <div data-evo="pricing-table" className="evo-pricing">
      {plans.map((plan) => (
        <EvoCard key={plan.id}>
          <EvoCardTitle>{plan.name}</EvoCardTitle>
          <p className="evo-stat-value">{plan.price}</p>
          <ul>
            {(plan.features ?? []).map((feature) => (
              <li key={feature}>{feature}</li>
            ))}
          </ul>
          <EvoButton>Choose {plan.name}</EvoButton>
        </EvoCard>
      ))}
    </div>
  );
}

export const PricingTable = EvoPricingTable;

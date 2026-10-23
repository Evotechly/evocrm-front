import * as React from "react";
import { EvoCheckbox } from "../forms/checkbox";

export function EvoOnboarding({
  steps,
}: {
  steps: { title: string; done?: boolean }[];
}) {
  return (
    <ol data-evo="onboarding" className="evo-onboarding">
      {steps.map((step) => (
        <li key={step.title}>
          <EvoCheckbox label={step.title} defaultChecked={step.done} />
        </li>
      ))}
    </ol>
  );
}

export const Onboarding = EvoOnboarding;

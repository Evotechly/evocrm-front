import * as React from "react";

export function EvoStepper({
  steps,
  current = 0,
}: {
  steps: { label: string }[];
  current?: number;
}) {
  return (
    <ol data-evo="stepper" className="evo-stepper">
      {steps.map((step, index) => (
        <li key={step.label} data-state={index === current ? "current" : index < current ? "done" : "todo"}>
          <span className="evo-step-index" aria-hidden>{index + 1}</span>
          {step.label}
        </li>
      ))}
    </ol>
  );
}

export const Stepper = EvoStepper;

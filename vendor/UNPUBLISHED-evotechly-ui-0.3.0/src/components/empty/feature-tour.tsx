import * as React from "react";
import { EvoDialog } from "../overlays/dialog";
import { EvoButton } from "../foundations/button";

export function EvoFeatureTour({
  steps,
  open = false,
  storageKey = "evo-feature-tour",
}: {
  steps: { id: string; title: string; body: string }[];
  open?: boolean;
  storageKey?: string;
}) {
  const [index, setIndex] = React.useState(0);
  const [visible, setVisible] = React.useState(open);
  React.useEffect(() => {
    setVisible(open);
  }, [open]);
  const step = steps[index];
  const finish = () => {
    window.localStorage?.setItem(storageKey, "1");
    setVisible(false);
  };
  if (!step) return null;
  return (
    <div data-evo="feature-tour">
      <EvoDialog open={visible} onOpenChange={setVisible} title={step.title} description={step.body}>
        <p className="tabular-nums">
          {index + 1} / {steps.length}
        </p>
        <div className="evo-card-footer">
          <EvoButton variant="ghost" onClick={finish}>
            Skip
          </EvoButton>
          <EvoButton
            onClick={() => {
              if (index >= steps.length - 1) finish();
              else setIndex((value) => value + 1);
            }}
          >
            Next
          </EvoButton>
        </div>
      </EvoDialog>
    </div>
  );
}

export const FeatureTour = EvoFeatureTour;

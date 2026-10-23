import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoCopyButton({ value, label = "Copy" }: { value: string; label?: string }) {
  const [copied, setCopied] = React.useState(false);
  return (
    <EvoButton
      data-evo="copy-button"
      variant="outline"
      size="sm"
      onClick={async () => {
        await navigator.clipboard?.writeText(value);
        setCopied(true);
        window.setTimeout(() => setCopied(false), 1500);
      }}
    >
      {copied ? "Copied" : label}
    </EvoButton>
  );
}

export const CopyButton = EvoCopyButton;

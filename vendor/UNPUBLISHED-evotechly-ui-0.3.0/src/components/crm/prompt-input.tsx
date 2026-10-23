import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoPromptInput({
  onSubmit,
}: {
  onSubmit?: (value: string) => void;
}) {
  const [value, setValue] = React.useState("");
  return (
    <form
      data-evo="prompt-input"
      className="evo-prompt"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit?.(value);
      }}
    >
      <textarea className="evo-textarea" aria-label="Prompt" value={value} onChange={(event) => setValue(event.target.value)} />
      <EvoButton type="submit">Send</EvoButton>
    </form>
  );
}

export const PromptInput = EvoPromptInput;

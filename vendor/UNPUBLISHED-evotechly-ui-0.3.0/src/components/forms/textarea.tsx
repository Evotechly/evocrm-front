import * as React from "react";
import { cn } from "../../lib/cn";

export function EvoTextarea({
  label,
  id,
  className,
  onChange,
  ...props
}: React.ComponentProps<"textarea"> & { label?: string }) {
  const generated = React.useId();
  const areaId = id ?? generated;
  const ref = React.useRef<HTMLTextAreaElement>(null);
  const resize = () => {
    const node = ref.current;
    if (!node) return;
    node.style.height = "auto";
    node.style.height = `${node.scrollHeight}px`;
  };
  return (
    <div data-evo="textarea" className="evo-field">
      {label ? <label className="evo-label" htmlFor={areaId}>{label}</label> : null}
      <textarea
        ref={ref}
        id={areaId}
        className={cn("evo-textarea", className)}
        onChange={(event) => {
          resize();
          onChange?.(event);
        }}
        {...props}
      />
    </div>
  );
}

export const Textarea = EvoTextarea;

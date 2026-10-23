import * as React from "react";

export function EvoTagsInput({
  label,
  value,
  onChange,
}: {
  label?: string;
  value?: string[];
  onChange?: (value: string[]) => void;
}) {
  const [internal, setInternal] = React.useState(value ?? []);
  const tags = value ?? internal;
  const commit = (next: string[]) => {
    setInternal(next);
    onChange?.(next);
  };
  return (
    <div data-evo="tags-input" className="evo-field">
      {label ? <label className="evo-label" htmlFor="evo-tags">{label}</label> : null}
      <div className="evo-tags">
        {tags.map((tag) => (
          <button key={tag} type="button" className="evo-badge" onClick={() => commit(tags.filter((item) => item !== tag))}>
            {tag} ×
          </button>
        ))}
        <input
          id="evo-tags"
          className="evo-input"
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              const next = event.currentTarget.value.trim();
              if (next) commit([...tags, next]);
              event.currentTarget.value = "";
            }
          }}
        />
      </div>
    </div>
  );
}

export const TagsInput = EvoTagsInput;

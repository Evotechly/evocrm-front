export interface ObjectView {
  value: string;
  label: string;
  count: number;
}
/** Quick views scope the same state as the corresponding filter select. */
export function ObjectViews({
  value,
  options,
  onChange,
  caption,
}: {
  value: string;
  options: ObjectView[];
  onChange: (value: string) => void;
  caption?: string;
}) {
  return (
    <div className="object-views" role="group" aria-label="Vues rapides">
      {options.map((o) => (
        <button key={o.value} aria-pressed={value === o.value} onClick={() => onChange(o.value)}>
          {o.label}
          <span>{o.count}</span>
        </button>
      ))}
      {caption && <span className="view-caption">{caption}</span>}
    </div>
  );
}

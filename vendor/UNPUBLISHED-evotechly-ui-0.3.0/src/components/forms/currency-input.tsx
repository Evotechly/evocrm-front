import * as React from "react";

export function EvoCurrencyInput({
  label = "Amount",
  currency = "DZD",
  value,
  defaultValue = 0,
  onChange,
}: {
  label?: string;
  currency?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  return (
    <div data-evo="currency-input" className="evo-field">
      <label className="evo-label" htmlFor="evo-currency">{label}</label>
      <div className="evo-affix">
        <span className="evo-affix-label">{currency}</span>
        <input
          id="evo-currency"
          className="evo-input tabular-nums"
          inputMode="decimal"
          value={current}
          onChange={(event) => {
            const next = Number(event.target.value);
            setInternal(next);
            onChange?.(next);
          }}
        />
      </div>
    </div>
  );
}

export const CurrencyInput = EvoCurrencyInput;

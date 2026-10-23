import * as React from "react";
import { AsYouType, parsePhoneNumberFromString, getCountries, type CountryCode } from "libphonenumber-js";

const COUNTRIES = getCountries();

export function EvoPhoneInput({
  label = "Phone",
  defaultCountry = "DZ",
  value,
  onChange,
}: {
  label?: string;
  defaultCountry?: CountryCode;
  value?: string;
  onChange?: (value: string, valid: boolean) => void;
}) {
  const [country, setCountry] = React.useState<CountryCode>(defaultCountry);
  const [internal, setInternal] = React.useState(value ?? "");
  const formatted = new AsYouType(country).input(internal);
  const parsed = parsePhoneNumberFromString(internal, country);
  return (
    <div data-evo="phone-input" className="evo-field">
      <label className="evo-label" htmlFor="evo-phone">{label}</label>
      <div className="evo-affix">
        <select
          aria-label="Country"
          className="evo-input"
          style={{ width: 88 }}
          value={country}
          onChange={(event) => setCountry(event.target.value as CountryCode)}
        >
          {COUNTRIES.map((code) => (
            <option key={code} value={code}>{code}</option>
          ))}
        </select>
        <input
          id="evo-phone"
          className="evo-input"
          value={formatted}
          aria-invalid={internal ? !parsed?.isValid() : undefined}
          onChange={(event) => {
            setInternal(event.target.value);
            const next = parsePhoneNumberFromString(event.target.value, country);
            onChange?.(event.target.value, Boolean(next?.isValid()));
          }}
        />
      </div>
    </div>
  );
}

export const PhoneInput = EvoPhoneInput;

"""Form implementations."""

from gen_v030_impl import add

add(
    "input",
    '''
import * as React from "react";
import { cn } from "../../lib/cn";

export type EvoInputProps = React.ComponentProps<"input"> & { label?: string };

export function EvoInput({ label, id, className, placeholder, ...props }: EvoInputProps) {
  const generated = React.useId();
  const inputId = id ?? generated;
  return (
    <div data-evo="input" className="evo-field evo-floating">
      {label ? <label className="evo-label" htmlFor={inputId}>{label}</label> : null}
      <input id={inputId} className={cn("evo-input", className)} placeholder={placeholder ?? " "} {...props} />
    </div>
  );
}

export const Input = EvoInput;
''',
)

add(
    "textarea",
    '''
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
''',
)

add(
    "select",
    '''
import * as React from "react";
import * as SelectPrimitive from "@radix-ui/react-select";

export type EvoSelectOption = { value: string; label: string };

export function EvoSelect({
  label,
  options,
  placeholder = "Select",
  defaultValue,
  value,
  onValueChange,
}: {
  label?: string;
  options: EvoSelectOption[];
  placeholder?: string;
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}) {
  const id = React.useId();
  return (
    <div data-evo="select" className="evo-field">
      {label ? <label className="evo-label" htmlFor={id}>{label}</label> : null}
      <SelectPrimitive.Root defaultValue={defaultValue} value={value} onValueChange={onValueChange}>
        <SelectPrimitive.Trigger id={id} className="evo-select-trigger" aria-label={label}>
          <SelectPrimitive.Value placeholder={placeholder} />
        </SelectPrimitive.Trigger>
        <SelectPrimitive.Portal>
          <SelectPrimitive.Content className="evo-select-content">
            {options.map((option) => (
              <SelectPrimitive.Item key={option.value} value={option.value} className="evo-select-item">
                <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
              </SelectPrimitive.Item>
            ))}
          </SelectPrimitive.Content>
        </SelectPrimitive.Portal>
      </SelectPrimitive.Root>
    </div>
  );
}

export const Select = EvoSelect;
''',
)

add(
    "combobox",
    '''
import * as React from "react";
import { EvoCommand, EvoCommandInput, EvoCommandItem, EvoCommandList } from "../navigation/command";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export type EvoComboboxOption = { value: string; label: string };

export function EvoCombobox({
  label,
  options,
  value,
  onValueChange,
  onSearch,
}: {
  label?: string;
  options: EvoComboboxOption[];
  value?: string;
  onValueChange?: (value: string) => void;
  onSearch?: (query: string) => void;
}) {
  const selected = options.find((option) => option.value === value);
  return (
    <div data-evo="combobox" className="evo-field">
      {label ? <span className="evo-label">{label}</span> : null}
      <EvoPopover
        content={
          <EvoCommand>
            <EvoCommandInput placeholder="Search" onValueChange={onSearch} />
            <EvoCommandList>
              {options.map((option) => (
                <EvoCommandItem key={option.value} value={option.value} onSelect={() => onValueChange?.(option.value)}>
                  {option.label}
                </EvoCommandItem>
              ))}
            </EvoCommandList>
          </EvoCommand>
        }
      >
        <EvoButton variant="outline" aria-label={label ?? "Combobox"} aria-haspopup="listbox">
          {selected?.label ?? "Select"}
        </EvoButton>
      </EvoPopover>
    </div>
  );
}

export const Combobox = EvoCombobox;
''',
)

add(
    "multi-select",
    '''
import * as React from "react";
import { EvoCheckbox } from "./checkbox";

export function EvoMultiSelect({
  label,
  options,
  value,
  onChange,
}: {
  label?: string;
  options: { value: string; label: string }[];
  value?: string[];
  onChange?: (value: string[]) => void;
}) {
  const [internal, setInternal] = React.useState<string[]>(value ?? []);
  const selected = value ?? internal;
  const toggle = (next: string) => {
    const updated = selected.includes(next) ? selected.filter((item) => item !== next) : [...selected, next];
    setInternal(updated);
    onChange?.(updated);
  };
  return (
    <div data-evo="multi-select" className="evo-field" role="listbox" aria-multiselectable aria-label={label}>
      {label ? <span className="evo-label">{label}</span> : null}
      {options.map((option) => (
        <EvoCheckbox
          key={option.value}
          label={option.label}
          checked={selected.includes(option.value)}
          onCheckedChange={() => toggle(option.value)}
        />
      ))}
    </div>
  );
}

export const MultiSelect = EvoMultiSelect;
''',
)

add(
    "tags-input",
    '''
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
''',
)

add(
    "checkbox",
    '''
import * as React from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";

export function EvoCheckbox({
  label,
  id,
  ...props
}: React.ComponentProps<typeof CheckboxPrimitive.Root> & { label?: string }) {
  const generated = React.useId();
  const boxId = id ?? generated;
  return (
    <label className="evo-label" htmlFor={boxId}>
      <CheckboxPrimitive.Root data-evo="checkbox" id={boxId} className="evo-checkbox" {...props}>
        <CheckboxPrimitive.Indicator>✓</CheckboxPrimitive.Indicator>
      </CheckboxPrimitive.Root>
      {label}
    </label>
  );
}

export const Checkbox = EvoCheckbox;
''',
)

add(
    "radio-group",
    '''
import * as React from "react";
import * as RadioGroupPrimitive from "@radix-ui/react-radio-group";

export function EvoRadioGroup({
  label,
  options,
  variant = "inline",
  error,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root> & {
  label?: string;
  options: { value: string; label: string; description?: string }[];
  variant?: "inline" | "card";
  error?: string;
}) {
  return (
    <fieldset data-evo="radio-group" className="evo-field" data-invalid={Boolean(error)}>
      {label ? <legend className="evo-field-legend">{label}</legend> : null}
      <RadioGroupPrimitive.Root className={variant === "card" ? "evo-radio-cards" : "evo-radio-group"} {...props}>
        {options.map((option) => (
          <label key={option.value} className={variant === "card" ? "evo-radio-card" : "evo-label"} data-disabled={props.disabled}>
            <RadioGroupPrimitive.Item value={option.value} className="evo-radio" disabled={props.disabled}>
              <RadioGroupPrimitive.Indicator />
            </RadioGroupPrimitive.Item>
            <span>
              {option.label}
              {option.description ? <small className="evo-field-description">{option.description}</small> : null}
            </span>
          </label>
        ))}
      </RadioGroupPrimitive.Root>
      {error ? <p className="evo-field-message" data-invalid="true">{error}</p> : null}
    </fieldset>
  );
}

export const RadioGroup = EvoRadioGroup;
export const Radio = RadioGroupPrimitive.Item;
''',
)

add(
    "switch",
    '''
import * as React from "react";
import * as SwitchPrimitive from "@radix-ui/react-switch";

export function EvoSwitch({
  label,
  id,
  ...props
}: React.ComponentProps<typeof SwitchPrimitive.Root> & { label?: string }) {
  const generated = React.useId();
  const switchId = id ?? generated;
  return (
    <label className="evo-label" htmlFor={switchId}>
      <SwitchPrimitive.Root data-evo="switch" id={switchId} className="evo-switch" {...props}>
        <SwitchPrimitive.Thumb className="evo-switch-thumb" />
      </SwitchPrimitive.Root>
      {label}
    </label>
  );
}

export const Switch = EvoSwitch;
''',
)

add(
    "slider",
    '''
import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

export function EvoSlider({
  label,
  ...props
}: React.ComponentProps<typeof SliderPrimitive.Root> & { label?: string }) {
  return (
    <div data-evo="slider" className="evo-field">
      {label ? <span className="evo-label">{label}</span> : null}
      <SliderPrimitive.Root className="evo-slider" aria-label={label} {...props}>
        <SliderPrimitive.Track className="evo-slider-track">
          <SliderPrimitive.Range className="evo-slider-range" />
        </SliderPrimitive.Track>
        {(props.defaultValue ?? props.value ?? [0]).map((_, index) => (
          <SliderPrimitive.Thumb key={index} className="evo-slider-thumb" />
        ))}
      </SliderPrimitive.Root>
    </div>
  );
}

export const Slider = EvoSlider;
''',
)

add(
    "date-picker",
    '''
import * as React from "react";
import { DayPicker } from "react-day-picker";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export function EvoDatePicker({
  label = "Date",
  value,
  onChange,
}: {
  label?: string;
  value?: Date;
  onChange?: (date?: Date) => void;
}) {
  const [date, setDate] = React.useState(value);
  return (
    <div data-evo="date-picker" className="evo-field">
      <span className="evo-label">{label}</span>
      <EvoPopover
        content={
          <DayPicker
            className="evo-calendar"
            mode="single"
            selected={date}
            onSelect={(next) => {
              setDate(next);
              onChange?.(next);
            }}
          />
        }
      >
        <EvoButton variant="outline">{date ? date.toLocaleDateString() : "Pick a date"}</EvoButton>
      </EvoPopover>
    </div>
  );
}

export const DatePicker = EvoDatePicker;
''',
)

add(
    "date-range-picker",
    '''
import * as React from "react";
import { DayPicker, type DateRange } from "react-day-picker";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

export function EvoDateRangePicker({
  label = "Range",
  value,
  onChange,
}: {
  label?: string;
  value?: DateRange;
  onChange?: (range?: DateRange) => void;
}) {
  const [range, setRange] = React.useState(value);
  return (
    <div data-evo="date-range-picker" className="evo-field">
      <span className="evo-label">{label}</span>
      <EvoPopover
        content={
          <DayPicker
            className="evo-calendar"
            mode="range"
            selected={range}
            onSelect={(next) => {
              setRange(next);
              onChange?.(next);
            }}
          />
        }
      >
        <EvoButton variant="outline">
          {range?.from && range.to
            ? `${range.from.toLocaleDateString()} – ${range.to.toLocaleDateString()}`
            : "Pick a range"}
        </EvoButton>
      </EvoPopover>
    </div>
  );
}

export const DateRangePicker = EvoDateRangePicker;
''',
)

add(
    "time-picker",
    '''
import * as React from "react";
import { EvoInput } from "./input";

export function EvoTimePicker({
  label = "Time",
  defaultValue,
  value,
  onChange,
}: {
  label?: string;
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <div data-evo="time-picker">
      <EvoInput
        type="time"
        label={label}
        defaultValue={defaultValue}
        value={value}
        onChange={(event) => onChange?.(event.target.value)}
      />
    </div>
  );
}

export const TimePicker = EvoTimePicker;
''',
)

add(
    "number-input",
    '''
import * as React from "react";
import { EvoButton } from "../foundations/button";

export function EvoNumberInput({
  label,
  value,
  defaultValue = 0,
  onChange,
  min,
  max,
  step = 1,
}: {
  label?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
}) {
  const [internal, setInternal] = React.useState(defaultValue);
  const current = value ?? internal;
  const set = (next: number) => {
    const clamped = Math.min(max ?? next, Math.max(min ?? next, next));
    setInternal(clamped);
    onChange?.(clamped);
  };
  return (
    <div data-evo="number-input" className="evo-stepper-field">
      {label ? <span className="evo-label">{label}</span> : null}
      <div className="evo-btn-group" data-orientation="horizontal">
        <EvoButton variant="outline" aria-label="Decrease" onClick={() => set(current - step)}>-</EvoButton>
        <input
          className="evo-input tabular-nums"
          type="number"
          value={current}
          min={min}
          max={max}
          step={step}
          onChange={(event) => set(Number(event.target.value))}
        />
        <EvoButton variant="outline" aria-label="Increase" onClick={() => set(current + step)}>+</EvoButton>
      </div>
    </div>
  );
}

export const NumberInput = EvoNumberInput;
''',
)

add(
    "currency-input",
    '''
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
''',
)

add(
    "phone-input",
    '''
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
''',
)

add(
    "file-upload",
    '''
import * as React from "react";

export function EvoFileUpload({
  label = "Upload files",
  onFiles,
}: {
  label?: string;
  onFiles?: (files: File[]) => void;
}) {
  const [files, setFiles] = React.useState<File[]>([]);
  const id = React.useId();
  return (
    <div
      data-evo="file-upload"
      className="evo-empty"
      onDragOver={(event) => event.preventDefault()}
      onDrop={(event) => {
        event.preventDefault();
        const next = Array.from(event.dataTransfer.files);
        setFiles(next);
        onFiles?.(next);
      }}
    >
      <label className="evo-label" htmlFor={id}>{label}</label>
      <input
        id={id}
        type="file"
        multiple
        onChange={(event) => {
          const next = Array.from(event.target.files ?? []);
          setFiles(next);
          onFiles?.(next);
        }}
      />
      <p className="evo-empty-description">{files.length ? `${files.length} file(s)` : "Drop files or browse"}</p>
    </div>
  );
}

export const FileUpload = EvoFileUpload;
''',
)

add(
    "form",
    '''
import * as React from "react";
import { FormProvider, useForm, type FieldValues, type UseFormReturn } from "react-hook-form";

export function EvoForm({
  children,
  onSubmit,
  form,
}: {
  children: React.ReactNode;
  onSubmit?: (values: FieldValues) => void;
  form?: UseFormReturn<FieldValues>;
}) {
  const inner = useForm();
  const methods = form ?? inner;
  return (
    <FormProvider {...methods}>
      <form data-evo="form" className="evo-field-group" onSubmit={methods.handleSubmit((values) => onSubmit?.(values))}>
        {children}
      </form>
    </FormProvider>
  );
}

export function EvoFormField({ children }: { children: React.ReactNode }) {
  return <div className="evo-field">{children}</div>;
}
export function EvoFormLabel(props: React.ComponentProps<"label">) {
  return <label className="evo-label" {...props} />;
}
export function EvoFormMessage({ children }: { children?: React.ReactNode }) {
  return children ? <p className="evo-form-message">{children}</p> : null;
}

export const Form = EvoForm;
''',
)

add(
    "input-otp",
    '''
import * as React from "react";
import { OTPInput, OTPInputContext } from "input-otp";

function Slot({ index }: { index: number }) {
  const context = React.useContext(OTPInputContext);
  const slot = context?.slots[index];
  return (
    <div className="evo-otp-slot" data-active={slot?.isActive}>
      {slot?.char}
    </div>
  );
}

export function EvoInputOtp({
  length = 6,
  value,
  onChange,
}: {
  length?: number;
  value?: string;
  onChange?: (value: string) => void;
}) {
  return (
    <OTPInput
      data-evo="input-otp"
      maxLength={length}
      value={value}
      onChange={onChange}
      containerClassName="evo-otp"
      render={({ slots }) => (
        <div className="evo-otp" role="group" aria-label="One-time code">
          {slots.map((_, index) => (
            <Slot key={index} index={index} />
          ))}
        </div>
      )}
    />
  );
}

export const InputOtp = EvoInputOtp;
export const EvoInputOTP = EvoInputOtp;
''',
)

add(
    "rich-text",
    '''
import * as React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Link from "@tiptap/extension-link";
import { EvoButton } from "../foundations/button";

export function EvoRichText({
  label = "Editor",
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange?: (markdown: string) => void;
}) {
  const editor = useEditor({
    extensions: [StarterKit, Link.configure({ openOnClick: false })],
    content: value ?? "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: instance }) => onChange?.(instance.getText()),
  });
  return (
    <div data-evo="rich-text" className="evo-field">
      <span className="evo-label">{label}</span>
      <div className="evo-editor-toolbar" role="toolbar" aria-label="Formatting">
        <EvoButton size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBold().run()}>Bold</EvoButton>
        <EvoButton size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleItalic().run()}>Italic</EvoButton>
        <EvoButton size="sm" variant="ghost" onClick={() => editor?.chain().focus().toggleBulletList().run()}>List</EvoButton>
      </div>
      <EditorContent editor={editor} className="evo-editor" aria-label={label} />
    </div>
  );
}

export const RichText = EvoRichText;
''',
)

add(
    "mention-input",
    '''
import * as React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Mention from "@tiptap/extension-mention";

export function EvoMentionInput({
  suggestions = [],
  onChange,
}: {
  suggestions?: { id: string; label: string }[];
  onChange?: (text: string) => void;
}) {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Mention.configure({
        HTMLAttributes: { class: "evo-mention" },
        suggestion: {
          items: ({ query }) =>
            suggestions.filter((item) => item.label.toLowerCase().includes(query.toLowerCase())),
        },
      }),
    ],
    content: "<p></p>",
    immediatelyRender: false,
    onUpdate: ({ editor: instance }) => onChange?.(instance.getText()),
  });
  return (
    <div data-evo="mention-input" className="evo-field">
      <label className="evo-label">Mention</label>
      <EditorContent editor={editor} className="evo-editor" aria-label="Mention people or records" />
    </div>
  );
}

export const MentionInput = EvoMentionInput;
''',
)

add(
    "color-picker",
    '''
import * as React from "react";
import { EvoPopover } from "../overlays/popover";
import { EvoButton } from "../foundations/button";

const SWATCHES = ["#D9500F", "#0E5E4A", "#BE185D", "#1E6FA8", "#B7791F", "#4A5442", "#0D1B24"];

export function EvoColorPicker({
  label = "Color",
  value,
  onChange,
}: {
  label?: string;
  value?: string;
  onChange?: (value: string) => void;
}) {
  const [internal, setInternal] = React.useState(value ?? SWATCHES[0]);
  const current = value ?? internal;
  const set = (next: string) => {
    setInternal(next);
    onChange?.(next);
  };
  return (
    <div data-evo="color-picker" className="evo-field">
      <span className="evo-label">{label}</span>
      <EvoPopover
        content={
          <div className="evo-swatches">
            {SWATCHES.map((swatch) => (
              <button
                key={swatch}
                type="button"
                aria-label={swatch}
                className="evo-swatch"
                style={{ background: `var(--brand-actionA11y)` }}
                onClick={() => set(swatch)}
              />
            ))}
            <input aria-label="Hex" className="evo-input" value={current} onChange={(event) => set(event.target.value)} />
          </div>
        }
      >
        <EvoButton variant="outline">{current}</EvoButton>
      </EvoPopover>
    </div>
  );
}

export const ColorPicker = EvoColorPicker;
''',
)

add(
    "rating",
    '''
import * as React from "react";

export function EvoRating({
  label = "Rating",
  value = 0,
  onChange,
  max = 5,
}: {
  label?: string;
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
}) {
  return (
    <div data-evo="rating" role="radiogroup" aria-label={label} className="evo-rating">
      {Array.from({ length: max }, (_, index) => {
        const score = index + 1;
        return (
          <button
            key={score}
            type="button"
            role="radio"
            aria-checked={value === score}
            aria-label={`${score} of ${max}`}
            className="evo-star"
            data-on={score <= value}
            onClick={() => onChange?.(score)}
          >
            ★
          </button>
        );
      })}
    </div>
  );
}

export const Rating = EvoRating;
''',
)

add(
    "toggle-group",
    '''
import * as React from "react";
import * as ToggleGroup from "@radix-ui/react-toggle-group";

export function EvoToggleGroup({
  options,
  value,
  defaultValue,
  onValueChange,
}: {
  options: { value: string; label: string }[];
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
}) {
  return (
    <ToggleGroup.Root
      data-evo="toggle-group"
      type="single"
      className="evo-btn-group"
      value={value}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {options.map((option) => (
        <ToggleGroup.Item key={option.value} value={option.value} className="evo-btn evo-btn--outline evo-btn--sm">
          {option.label}
        </ToggleGroup.Item>
      ))}
    </ToggleGroup.Root>
  );
}

export const ToggleGroup = EvoToggleGroup;
''',
)

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

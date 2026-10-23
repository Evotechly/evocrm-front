import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

export function EvoSignUp({ onSubmit }: { onSubmit?: (values: { name: string; email: string }) => void }) {
  return (
    <form
      data-evo="sign-up"
      className="evo-card"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({ name: String(data.get("name")), email: String(data.get("email")) });
      }}
    >
      <h2>Create account</h2>
      <EvoInput name="name" label="Name" required />
      <EvoInput name="email" type="email" label="Email" required />
      <EvoInput name="password" type="password" label="Password" required />
      <EvoButton type="submit">Create account</EvoButton>
    </form>
  );
}

export const SignUp = EvoSignUp;

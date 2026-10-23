import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

export function EvoSignIn({ onSubmit }: { onSubmit?: (values: { email: string; password: string }) => void }) {
  return (
    <form
      data-evo="sign-in"
      className="evo-card"
      onSubmit={(event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        onSubmit?.({ email: String(data.get("email")), password: String(data.get("password")) });
      }}
    >
      <h2>Sign in</h2>
      <EvoInput name="email" type="email" label="Email" required />
      <EvoInput name="password" type="password" label="Password" required />
      <EvoButton type="submit">Continue</EvoButton>
    </form>
  );
}

export const SignIn = EvoSignIn;

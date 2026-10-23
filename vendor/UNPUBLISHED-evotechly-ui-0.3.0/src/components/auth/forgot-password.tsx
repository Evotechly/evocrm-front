import * as React from "react";
import { EvoInput } from "../forms/input";
import { EvoButton } from "../foundations/button";

function scorePassword(value: string) {
  let score = 0;
  if (value.length >= 8) score += 1;
  if (/[A-Z]/.test(value)) score += 1;
  if (/[0-9]/.test(value)) score += 1;
  if (/[^A-Za-z0-9]/.test(value)) score += 1;
  return score;
}

export function EvoForgotPassword() {
  const [password, setPassword] = React.useState("");
  const score = scorePassword(password);
  return (
    <form data-evo="forgot-password" className="evo-card">
      <h2>Reset password</h2>
      <EvoInput type="email" label="Email" required />
      <EvoInput type="password" label="New password" value={password} onChange={(event) => setPassword(event.target.value)} />
      <p className="evo-label">Strength {score}/4</p>
      <EvoButton type="submit">Reset</EvoButton>
    </form>
  );
}

export const ForgotPassword = EvoForgotPassword;

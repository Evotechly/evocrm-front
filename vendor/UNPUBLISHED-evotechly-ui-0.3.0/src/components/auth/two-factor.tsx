import * as React from "react";
import { EvoInputOtp } from "../forms/input-otp";
import { EvoCopyButton } from "../data-display/copy-button";
import { EvoButton } from "../foundations/button";

export function EvoTwoFactor({
  secret,
  backupCodes = ["A1B2-C3D4", "E5F6-G7H8"],
}: {
  secret: string;
  backupCodes?: string[];
}) {
  const otpauth = `otpauth://totp/EvoCRM?secret=${secret}&issuer=Evotechly`;
  return (
    <form data-evo="two-factor" className="evo-card">
      <h2>Two-factor authentication</h2>
      <p className="evo-card-description">Scan this otpauth URL or enter the secret.</p>
      <code className="evo-mono">{otpauth}</code>
      <EvoCopyButton value={secret} label="Copy secret" />
      <EvoInputOtp />
      <ul>
        {backupCodes.map((code) => (
          <li key={code} className="evo-mono">{code}</li>
        ))}
      </ul>
      <EvoButton type="submit">Verify</EvoButton>
    </form>
  );
}

export const TwoFactor = EvoTwoFactor;

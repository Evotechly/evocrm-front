import * as React from "react";
import { EvoSwitch } from "../forms/switch";

export function EvoSettingsPage({
  flags,
}: {
  flags: { id: string; label: string; enabled: boolean }[];
}) {
  return (
    <form data-evo="settings-page" className="evo-card">
      <h2>Settings</h2>
      {flags.map((flag) => (
        <EvoSwitch key={flag.id} label={flag.label} defaultChecked={flag.enabled} />
      ))}
    </form>
  );
}

export const SettingsPage = EvoSettingsPage;

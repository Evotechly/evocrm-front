import * as React from "react";
import { EvoDropdownMenu } from "../overlays/dropdown-menu";
import { EvoAvatar } from "../foundations/avatar";
import { EvoButton } from "../foundations/button";

export function EvoAccountButton({ name, email }: { name: string; email?: string }) {
  return (
    <EvoDropdownMenu items={[{ label: "Profile" }, { label: "Sign out" }]}>
      <EvoButton data-evo="account-button" variant="ghost">
        <EvoAvatar fallback={name.slice(0, 2)} alt="" size="sm" />
        {name}
        {email ? <span className="evo-card-description">{email}</span> : null}
      </EvoButton>
    </EvoDropdownMenu>
  );
}

export const AccountButton = EvoAccountButton;

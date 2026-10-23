import * as React from "react";
import { EvoDropdownMenu } from "../overlays/dropdown-menu";
import { EvoButton } from "../foundations/button";
import { EvoAvatar } from "../foundations/avatar";

export function EvoOrgSwitcher({
  orgs,
  onCreate,
}: {
  orgs: { id: string; name: string; role?: string }[];
  onCreate?: () => void;
}) {
  return (
    <EvoDropdownMenu
      items={[
        ...orgs.map((org) => ({ label: `${org.name} · ${org.role ?? "Member"}` })),
        { label: "Create workspace", onSelect: onCreate },
      ]}
    >
      <EvoButton data-evo="org-switcher" variant="ghost">
        <EvoAvatar fallback={orgs[0]?.name.slice(0, 2)} alt="" size="sm" />
        {orgs[0]?.name ?? "Workspace"}
      </EvoButton>
    </EvoDropdownMenu>
  );
}

export const OrgSwitcher = EvoOrgSwitcher;

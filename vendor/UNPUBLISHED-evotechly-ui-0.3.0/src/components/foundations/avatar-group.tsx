import * as React from "react";
import { EvoAvatar } from "./avatar";
import type { EvoSize } from "../../lib/types";

export type EvoAvatarGroupPerson = { name: string; src?: string };
export type EvoAvatarGroupProps = {
  people: EvoAvatarGroupPerson[];
  max?: number;
  size?: EvoSize;
};

export function EvoAvatarGroup({ people, max = 4, size = "sm" }: EvoAvatarGroupProps) {
  const shown = people.slice(0, max);
  const extra = people.length - shown.length;
  return (
    <div data-evo="avatar-group" role="group" aria-label="People" className="evo-avatar-group">
      {shown.map((person) => (
        <EvoAvatar key={person.name} alt={person.name} src={person.src} fallback={person.name.slice(0, 2)} size={size} />
      ))}
      {extra > 0 ? <span className="evo-avatar evo-avatar-more">+{extra}</span> : null}
    </div>
  );
}

export const AvatarGroup = EvoAvatarGroup;

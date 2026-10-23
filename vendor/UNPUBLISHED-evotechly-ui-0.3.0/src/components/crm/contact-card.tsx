import * as React from "react";
import { EvoCard, EvoCardDescription, EvoCardFooter, EvoCardTitle } from "../layout/card";
import { EvoAvatar } from "../foundations/avatar";
import { EvoButton } from "../foundations/button";

export function EvoContactCard({
  name,
  email,
  role,
}: {
  name: string;
  email?: string;
  role?: string;
}) {
  return (
    <EvoCard data-evo="contact-card">
      <EvoAvatar fallback={name.slice(0, 2)} alt={name} />
      <EvoCardTitle>{name}</EvoCardTitle>
      <EvoCardDescription>{email}{role ? ` · ${role}` : ""}</EvoCardDescription>
      <EvoCardFooter>
        <EvoButton size="sm">Message</EvoButton>
      </EvoCardFooter>
    </EvoCard>
  );
}

export const ContactCard = EvoContactCard;

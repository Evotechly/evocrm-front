import * as React from "react";
import { EvoBanner } from "../feedback/banner";

export function EvoAnnouncement({ title }: { title: string }) {
  return <div data-evo="announcement"><EvoBanner title={title} /></div>;
}

export const Announcement = EvoAnnouncement;

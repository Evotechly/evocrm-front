import * as React from "react";
import { EvoDayPicker } from "../../lib/day-picker";

export function EvoEventCalendar({
  events = [],
}: {
  events?: { id: string; title: string; date: string }[];
}) {
  const modifiers = Object.fromEntries(events.map((event) => [event.id, new Date(event.date)]));
  return (
    <div data-evo="event-calendar">
      <EvoDayPicker navLabel="Event month navigation" modifiers={modifiers} />
      <ul className="evo-timeline">
        {events.map((event) => (
          <li key={event.id}>
            <strong>{event.title}</strong> <time dateTime={event.date}>{event.date}</time>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const EventCalendar = EvoEventCalendar;

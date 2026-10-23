import * as React from "react";

export function EvoConversation({
  threads,
}: {
  threads: { id: string; title: string; preview: string }[];
}) {
  return (
    <ul data-evo="conversation" className="evo-conversation">
      {threads.map((thread) => (
        <li key={thread.id}>
          <strong>{thread.title}</strong>
          <p className="evo-card-description">{thread.preview}</p>
        </li>
      ))}
    </ul>
  );
}

export const Conversation = EvoConversation;

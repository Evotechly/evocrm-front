import * as React from "react";

export function EvoChat({
  messages,
}: {
  messages: { id: string; role: "user" | "assistant"; content: string }[];
}) {
  return (
    <div data-evo="chat" role="log" className="evo-chat">
      {messages.map((message) => (
        <article key={message.id} data-role={message.role} className="evo-chat-bubble">
          {message.content}
        </article>
      ))}
    </div>
  );
}

export const Chat = EvoChat;

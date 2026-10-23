import { useState } from 'react';
import { EvoAvatar, EvoButton, EvoTextarea } from '@evotechly/ui';
import { NoResults } from '@/app/ScreenState';
import type { ThreadRecord, Message } from '@/app/providers/CrmProvider';

export function ConversationList({
  threads,
  activeId,
  onSelect,
}: {
  threads: ThreadRecord[];
  activeId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <div className="thread-list">
      {threads.length ? (
        threads.map((thread) => (
          <button
            key={thread.id}
            className={`thread-row ${activeId === thread.id ? 'active' : ''}`}
            aria-pressed={activeId === thread.id}
            onClick={() => onSelect(thread.id)}
          >
            <EvoAvatar
              fallback={thread.contact
                .split(' ')
                .map((word) => word[0])
                .join('')}
              alt={thread.contact}
            />
            <span>
              <strong>{thread.contact}</strong>
              <small>{thread.subject}</small>
              <em>{thread.preview}</em>
            </span>
            <aside>
              <small>{thread.channel}</small>
              {thread.unread ? <span className="unread-label">Non lue</span> : null}
            </aside>
          </button>
        ))
      ) : (
        <NoResults title="Aucune conversation" detail="Essayez un autre filtre." />
      )}
    </div>
  );
}

export function MessageThread({ messages, contact }: { messages: Message[]; contact: string }) {
  return (
    <div
      className="conversation-body"
      role="log"
      aria-label={`Messages avec ${contact}`}
      aria-live="polite"
    >
      {messages.map((message) => (
        <div key={message.id} className={`message ${message.direction}`}>
          <small>
            {message.direction === 'sent' ? 'Vous · simulation' : contact} · {message.time}
          </small>
          <p>{message.body}</p>
        </div>
      ))}
    </div>
  );
}

export function MessageComposer({
  onSend,
  disabled,
}: {
  onSend: (body: string) => void;
  disabled?: boolean;
}) {
  const [body, setBody] = useState('');
  return (
    <form
      className="composer"
      onSubmit={(event) => {
        event.preventDefault();
        if (body.trim()) {
          onSend(body.trim());
          setBody('');
        }
      }}
    >
      <EvoTextarea
        label="Votre réponse"
        aria-label="Votre réponse"
        maxLength={5000}
        placeholder="Écrire une réponse…"
        value={body}
        disabled={disabled}
        onChange={(event) => setBody(event.target.value)}
      />
      <div>
        <span>Envoi simulé · aucun message externe</span>
        <EvoButton type="submit" variant="primary" disabled={disabled || !body.trim()}>
          Envoyer (simulation)
        </EvoButton>
      </div>
    </form>
  );
}

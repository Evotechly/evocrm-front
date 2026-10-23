import { useState } from 'react';
import { Avatar, Button } from '@evotechly/ui';
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
        threads.map((t) => (
          <button
            key={t.id}
            className={`thread-row ${activeId === t.id ? 'active' : ''}`}
            aria-pressed={activeId === t.id}
            onClick={() => onSelect(t.id)}
          >
            <Avatar
              initials={t.contact
                .split(' ')
                .map((w) => w[0])
                .join('')}
            />
            <span>
              <strong>{t.contact}</strong>
              <small>{t.subject}</small>
              <em>{t.preview}</em>
            </span>
            <aside>
              <small>{t.channel}</small>
              {t.unread && <span className="unread-label">Non lue</span>}
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
      {messages.map((m) => (
        <div key={m.id} className={`message ${m.direction}`}>
          <small>
            {m.direction === 'sent' ? 'Vous · simulation' : contact} · {m.time}
          </small>
          <p>{m.body}</p>
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
      onSubmit={(e) => {
        e.preventDefault();
        if (body.trim()) {
          onSend(body.trim());
          setBody('');
        }
      }}
    >
      <label className="field">
        <span>Votre réponse</span>
        <textarea
          aria-label="Votre réponse"
          maxLength={5000}
          placeholder="Écrire une réponse…"
          value={body}
          disabled={disabled}
          onChange={(e) => setBody(e.target.value)}
        />
      </label>
      <div>
        <span>Envoi simulé · aucun message externe</span>
        <Button type="submit" variant="primary" disabled={disabled || !body.trim()}>
          Envoyer (simulation)
        </Button>
      </div>
    </form>
  );
}

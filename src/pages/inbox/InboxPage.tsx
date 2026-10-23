import { useState } from 'react';
import { useCrm } from '@/app/providers/CrmProvider';
import { useNavigation } from '@/app/providers/NavigationProvider';
import { Button } from '@/components/ui';
import { ScreenState, usePreviewState, NoResults } from '@/components/ui/ScreenState';
import { Select, Input } from '@/components/forms/Fields';
import { SearchInput, ViewSwitcher } from '@/components/data-display/Controls';
import { ConversationList, MessageThread, MessageComposer } from '@/components/crm/Inbox';
import { ContactDetailPanel } from '@/components/crm/Contacts';
import { Popover } from '@/components/ui/Overlays';
import { formatDzd } from '@/lib/format';
import {
  RecordActivityTimeline,
  WorkspaceHeader,
  WorkspaceToolbar,
} from '@/components/workspace/Workspace';
export function InboxPage() {
  const { threads, setThreads, contacts, deals, notify, can } = useCrm();
  const { navigate } = useNavigation();
  const state = usePreviewState();
  const [activeId, setActive] = useState<string | null>(null),
    [query, setQuery] = useState(''),
    [channel, setChannel] = useState(''),
    [queue, setQueue] = useState('all'),
    [showList, setShowList] = useState(true);
  const rows = (state === 'empty' ? [] : threads).filter(
    (t) =>
      `${t.contact} ${t.subject} ${t.preview}`.toLowerCase().includes(query.toLowerCase()) &&
      (!channel || t.channel === channel) &&
      (queue !== 'unread' || t.unread) &&
      (queue !== 'mine' || t.assignee === 'MB'),
  );
  const active = rows.find((t) => t.id === activeId) ?? rows[0];
  const contact = contacts.find((c) => c.name === active?.contact);
  const linked = deals.find((d) => d.company === contact?.company);
  const update = (values: Partial<(typeof threads)[number]>) => {
    if (active && can('desk.manage'))
      setThreads((ts) => ts.map((t) => (t.id === active.id ? { ...t, ...values } : t)));
  };
  return (
    <ScreenState permission="desk.view">
      <section className="page-stack inbox-page" data-screen-id="SCR-INBOX-001">
        <WorkspaceHeader
          title="Inbox"
          description="Le bon contexte. La bonne réponse."
          count={rows.length}
          actions={<span className="demo-pill">Envoi simulé uniquement</span>}
        />
        <div className="inbox-workspace">
          <div className={`inbox-list panel ${!showList ? 'mobile-hidden' : ''}`}>
            <div className="inbox-list-header">
              <strong>Conversations</strong>
              <span className="muted">{rows.length}</span>
            </div>
            <WorkspaceToolbar label="Filtres des conversations">
              <div className="inbox-filters">
                <SearchInput label="Rechercher une conversation" value={query} onChange={setQuery} />
                <ViewSwitcher
                  value={queue}
                  onChange={setQueue}
                  options={[
                    { value: 'all', label: 'Toutes' },
                    { value: 'mine', label: 'Les miennes' },
                    { value: 'unread', label: 'Non lues' },
                  ]}
                />
                <Select label="Canal" value={channel} onChange={(e) => setChannel(e.target.value)}>
                  <option value="">Tous les canaux</option>
                  <option>Email</option>
                  <option>WhatsApp</option>
                </Select>
              </div>
            </WorkspaceToolbar>
            <ConversationList
              threads={rows}
              activeId={active?.id ?? null}
              onSelect={(id) => {
                setActive(id);
                setShowList(false);
                setThreads((ts) => ts.map((t) => (t.id === id ? { ...t, unread: false } : t)));
              }}
            />
          </div>
          <div className={`panel conversation-panel ${showList ? 'mobile-hidden' : ''}`}>
            {active ? (
              <>
                <div className="conversation-header">
                  <div>
                    <button className="text-button inbox-back" onClick={() => setShowList(true)}>
                      ← Conversations
                    </button>
                    <strong>{active.contact}</strong>
                    <small className="cell-meta">
                      {active.subject} · {active.channel}
                    </small>
                  </div>
                  <Popover label="Contexte du contact" trigger={<Button>Contexte</Button>}>
                    {contact ? (
                      <ContactDetailPanel contact={contact} />
                    ) : (
                      <p>Contact non associé</p>
                    )}
                  </Popover>
                </div>
                <MessageThread messages={active.messages} contact={active.contact} />
                <MessageComposer
                  key={active.id}
                  disabled={!can('desk.manage')}
                  onSend={(body) => {
                    update({
                      messages: [
                        ...active.messages,
                        { id: crypto.randomUUID(), body, direction: 'sent', time: 'À l’instant' },
                      ],
                      preview: body,
                      unread: false,
                    });
                    notify('Réponse ajoutée à la conversation. Aucun envoi externe.');
                  }}
                />
              </>
            ) : (
              <NoResults
                title="Aucune conversation à afficher"
                detail="Modifiez vos filtres pour retrouver une conversation."
              />
            )}
          </div>
          {active && (
            <aside className="context-panel panel">
              <h2>Contexte client</h2>
              {contact ? (
                <>
                  <strong>{contact.name}</strong>
                  <p className="muted">{contact.company}</p>
                  <a href={`mailto:${contact.email}`}>{contact.email}</a>
                </>
              ) : (
                <p>Contact non associé</p>
              )}
              <Select
                label="Attribuer à"
                value={active.assignee}
                disabled={!can('desk.manage')}
                onChange={(e) => update({ assignee: e.target.value })}
              >
                {['MB', 'SA', 'NS', 'Non attribué'].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </Select>
              <h3>Deal lié</h3>
              {linked ? (
                <button className="linked-record" onClick={() => navigate('/crm/deals')}>
                  <strong>{linked.name}</strong>
                  <span>
                    <span className="money">{formatDzd(linked.value)}</span> · {linked.stage}
                  </span>
                </button>
              ) : (
                <p className="muted">Aucun deal associé</p>
              )}
              <Input
                label="Prochaine action"
                value={active.nextAction}
                disabled={!can('desk.manage')}
                placeholder="Ex. Confirmer le calendrier"
                onChange={(e) => update({ nextAction: e.target.value })}
              />
              <RecordActivityTimeline
                items={[
                  {
                    title: 'Conversation active',
                    detail: `${active.contact} · ${active.channel}`,
                    time: active.time,
                  },
                ]}
              />
              <p className="muted">Note locale, sans rappel automatique.</p>
            </aside>
          )}
        </div>
        {active && showList && (
          <Button className="inbox-show-thread" onClick={() => setShowList(false)}>
            Ouvrir la conversation · {active.contact}
          </Button>
        )}
      </section>
    </ScreenState>
  );
}

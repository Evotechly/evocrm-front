import { Link, Navigate, Route, Routes, useLocation, useParams } from 'react-router-dom';
import {
  Alert,
  Avatar,
  AvatarGroup,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  CheckboxGroup,
  Combobox,
  CommandMenu,
  DataTable,
  DatePicker,
  Dialog,
  Drawer,
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuItem,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  EmptyState,
  IconButton,
  Input,
  Pagination,
  Popover,
  Progress,
  RadioGroup,
  Select,
  Sidebar,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  Tooltip,
  Topbar,
  toast,
  useTheme,
} from '@evotechly/ui';
import { Bell, House, Plus, User } from '@phosphor-icons/react';
import { useMemo, useState } from 'react';
import { catalog, groups } from './catalog';

export function App() {
  const { mode, product, setProduct, toggleMode } = useTheme();
  const location = useLocation();
  return (
    <div className="showcase-shell">
      <nav className="showcase-nav" aria-label="Components">
        <Button variant="ghost" onClick={() => (window.location.href = '/')}>
          Evotechly UI
        </Button>
        {groups.map((group) => (
          <section key={group.id}>
            <h2>{group.label}</h2>
            {catalog
              .filter((item) => item.group === group.id)
              .map((item) => (
                <Link
                  key={item.slug}
                  to={`/components/${item.slug}`}
                  aria-current={location.pathname.endsWith(item.slug) ? 'page' : undefined}
                >
                  {item.name}
                </Link>
              ))}
          </section>
        ))}
      </nav>
      <div className="showcase-main">
        <div className="showcase-theme">
          <Button size="sm" variant="secondary" onClick={toggleMode}>
            {mode === 'light' ? 'Dark' : 'Light'} mode
          </Button>
          <Select
            label="Product theme"
            value={product}
            onValueChange={(value) => setProduct(value as typeof product)}
            options={[
              { value: 'suite', label: 'Suite' },
              { value: 'evocrm', label: 'EvoCRM' },
              { value: 'evopulse', label: 'Evopulse' },
              { value: 'evorail', label: 'EvoRail' },
            ]}
          />
        </div>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/components/:slug" element={<ComponentPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  );
}

function HomePage() {
  return (
    <main className="showcase-page">
      <h1>Evotechly UI</h1>
      <p>Brandbook 2.0 component library. All 31 primitives, live under Suite and product themes.</p>
      <div className="showcase-grid">
        {catalog.map((item) => (
          <Link key={item.slug} className="showcase-card" to={`/components/${item.slug}`}>
            <strong>{item.name}</strong>
            <p>{item.summary}</p>
          </Link>
        ))}
      </div>
    </main>
  );
}

function ComponentPage() {
  const { slug } = useParams();
  const doc = catalog.find((item) => item.slug === slug);
  if (!doc) return <Navigate to="/" replace />;
  return (
    <main className="showcase-page">
      <Topbar title={doc.name} breadcrumbs={[{ label: 'Components', href: '/' }, { label: doc.name }]} />
      <p>{doc.summary}</p>
      <section className="showcase-panel">
        <h2>Live preview</h2>
        <Demo slug={doc.slug} />
      </section>
      <section className="showcase-panel">
        <h2>Props</h2>
        <table className="ev-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Type</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {doc.props.map((prop) => (
              <tr key={prop.name}>
                <td>{prop.name}</td>
                <td>{prop.type}</td>
                <td>{prop.notes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
      <section className="showcase-panel">
        <h2>Example</h2>
        <pre className="showcase-code">{doc.example}</pre>
      </section>
      <section className="showcase-panel">
        <h2>Accessibility</h2>
        <p>{doc.a11y}</p>
      </section>
      <section className="showcase-panel">
        <h2>Brandbook tokens</h2>
        <p>{doc.tokens.join(', ')}</p>
      </section>
    </main>
  );
}

function Demo({ slug }: { slug: string }) {
  const [segment, setSegment] = useState('week');
  const [page, setPage] = useState(2);
  const [on, setOn] = useState(true);
  const [commandOpen, setCommandOpen] = useState(false);
  const rows = useMemo(
    () => [
      { name: 'Ada Lovelace', company: 'Analytical Engines', stage: 'Won' },
      { name: 'Grace Hopper', company: 'COBOL', stage: 'Open' },
      { name: 'Alan Turing', company: 'Bletchley', stage: 'Open' },
    ],
    [],
  );

  switch (slug) {
    case 'button':
      return (
        <div className="showcase-row">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="destructive">Destructive</Button>
          <Button size="sm">Small</Button>
          <Button size="lg" leadingIcon={<Plus />}>
            Large
          </Button>
          <Button loading>Saving</Button>
          <Button disabled>Disabled</Button>
        </div>
      );
    case 'icon-button':
      return (
        <div className="showcase-row">
          <IconButton label="Add" icon={<Plus />} />
          <IconButton label="Quiet add" icon={<Plus />} variant="ghost" />
          <IconButton label="Busy" icon={<Plus />} loading />
          <IconButton label="Disabled" icon={<Plus />} disabled />
        </div>
      );
    case 'button-group':
      return (
        <ButtonGroup segmented value={segment} onValueChange={setSegment}>
          <Button value="day" variant="ghost">
            Day
          </Button>
          <Button value="week" variant="ghost">
            Week
          </Button>
          <Button value="month" variant="ghost" disabled>
            Month
          </Button>
        </ButtonGroup>
      );
    case 'input':
      return (
        <div className="showcase-row">
          <Input label="Name" placeholder="Ada" />
          <Input label="Email" type="email" />
          <Input label="Password" type="password" />
          <Input label="Amount" type="number" />
          <Input label="Search" type="search" leadingIcon={<House />} />
          <Input label="Broken" error="Required" />
          <Input label="Locked" disabled value="Read only later" />
          <Input label="Canonical" readOnly value="DZ-001" />
        </div>
      );
    case 'textarea':
      return <Textarea label="Notes" showCount maxLength={80} autoResize hint="Visible to the team." />;
    case 'select':
      return (
        <Select
          label="Stage"
          placeholder="Choose"
          error=""
          options={[
            { value: 'new', label: 'New' },
            { value: 'won', label: 'Won' },
            { value: 'lost', label: 'Lost', disabled: true },
          ]}
        />
      );
    case 'combobox':
      return (
        <Combobox
          label="Owner"
          options={[
            { value: 'ada', label: 'Ada Lovelace' },
            { value: 'grace', label: 'Grace Hopper' },
          ]}
        />
      );
    case 'checkbox':
      return (
        <CheckboxGroup legend="Visibility">
          <Checkbox label="Checked" defaultChecked />
          <Checkbox label="Unchecked" />
          <Checkbox label="Mixed" checked="indeterminate" />
          <Checkbox label="Disabled" disabled />
          <Checkbox label="Invalid" error="Required" />
        </CheckboxGroup>
      );
    case 'radio-group':
      return (
        <RadioGroup
          legend="Plan"
          orientation="horizontal"
          options={[
            { value: 'solo', label: 'Solo' },
            { value: 'team', label: 'Team' },
            { value: 'off', label: 'Off', disabled: true },
          ]}
        />
      );
    case 'switch':
      return <Switch label="Advanced" description="Shows extra modules" checked={on} onCheckedChange={setOn} />;
    case 'date-picker':
      return <DatePicker label="Close date" />;
    case 'sidebar':
      return (
        <div style={{ height: 280, display: 'flex', background: 'var(--color-canvas)' }}>
          <Sidebar
            items={[
              { id: 'home', label: 'Home', icon: <House />, active: true },
              {
                id: 'crm',
                label: 'CRM',
                icon: <User />,
                children: [
                  { id: 'contacts', label: 'Contacts' },
                  { id: 'deals', label: 'Deals' },
                ],
              },
            ]}
          />
        </div>
      );
    case 'topbar':
      return (
        <Topbar
          title="Inbox"
          breadcrumbs={[{ label: 'Workspace', href: '#' }, { label: 'Inbox' }]}
          onSearch={() => undefined}
          actions={<Button size="sm">Compose</Button>}
          notifications={<IconButton label="Notifications" icon={<Bell />} variant="ghost" />}
          account={<Avatar initials="AL" alt="Ada" />}
        />
      );
    case 'tabs':
      return (
        <Tabs
          variant="underline"
          items={[
            { value: 'open', label: 'Open', content: 'Open records' },
            { value: 'won', label: 'Won', content: 'Won records' },
          ]}
        />
      );
    case 'command-menu':
      return (
        <>
          <Button onClick={() => setCommandOpen(true)}>Open command menu</Button>
          <CommandMenu
            open={commandOpen}
            onOpenChange={setCommandOpen}
            recent={['inbox']}
            items={[
              { id: 'inbox', label: 'Go to inbox', group: 'Navigation', shortcut: 'G I' },
              { id: 'create', label: 'Create contact', group: 'Actions' },
            ]}
          />
        </>
      );
    case 'breadcrumbs':
      return (
        <Breadcrumbs
          items={[
            { label: 'Home', href: '#' },
            { label: 'CRM', href: '#' },
            { label: 'Contacts', href: '#' },
            { label: 'Ada Lovelace' },
          ]}
        />
      );
    case 'data-table':
      return (
        <DataTable
          data={rows}
          columns={[
            { accessorKey: 'name', header: 'Name' },
            { accessorKey: 'company', header: 'Company' },
            { accessorKey: 'stage', header: 'Stage' },
          ]}
        />
      );
    case 'badge':
      return (
        <div className="showcase-row">
          <Badge>Neutral</Badge>
          <Badge tone="success">Success</Badge>
          <Badge tone="warning">Warning</Badge>
          <Badge tone="error">Error</Badge>
          <Badge tone="information">Information</Badge>
          <Badge tone="brand" icon={<House />}>
            EvoCRM
          </Badge>
        </div>
      );
    case 'avatar':
      return (
        <AvatarGroup>
          <Avatar initials="AL" alt="Ada" />
          <Avatar initials="GH" alt="Grace" size="lg" />
          <Avatar alt="Fallback" />
        </AvatarGroup>
      );
    case 'pagination':
      return <Pagination page={page} pageCount={8} onPageChange={setPage} />;
    case 'empty-state':
      return (
        <EmptyState
          title="No contacts"
          description="Create a person to start the pipeline."
          icon={<User size={28} />}
          action={<Button>Create</Button>}
          secondaryAction={<Button variant="ghost">Import</Button>}
        />
      );
    case 'skeleton':
      return (
        <div className="showcase-row" style={{ width: '100%' }}>
          <Skeleton />
          <Skeleton variant="avatar" />
          <Skeleton variant="card" />
          <Skeleton variant="table" />
        </div>
      );
    case 'dialog':
      return (
        <Dialog title="Create contact" description="Stored in this session only." trigger={<Button>Open dialog</Button>}>
          <Input label="Name" />
        </Dialog>
      );
    case 'drawer':
      return (
        <Drawer title="Filters" side="right" trigger={<Button variant="secondary">Open drawer</Button>}>
          <Checkbox label="Open deals only" />
        </Drawer>
      );
    case 'dropdown-menu':
      return (
        <DropdownMenu trigger={<Button variant="secondary">Menu</Button>}>
          <DropdownMenuItem>Edit</DropdownMenuItem>
          <DropdownMenuCheckboxItem checked>Pinned</DropdownMenuCheckboxItem>
          <DropdownMenuSeparator />
          <DropdownMenuRadioGroup value="list">
            <DropdownMenuRadioItem value="list">List</DropdownMenuRadioItem>
            <DropdownMenuRadioItem value="board" disabled>
              Board
            </DropdownMenuRadioItem>
          </DropdownMenuRadioGroup>
          <DropdownMenuSub trigger="More">
            <DropdownMenuItem>Archive</DropdownMenuItem>
          </DropdownMenuSub>
        </DropdownMenu>
      );
    case 'tooltip':
      return (
        <Tooltip content="Creates a contact">
          <Button>Hover or focus</Button>
        </Tooltip>
      );
    case 'popover':
      return (
        <Popover trigger={<Button variant="secondary">Open popover</Button>}>
          <p>Collision-aware surface.</p>
        </Popover>
      );
    case 'toast':
      return (
        <div className="showcase-row">
          <Button onClick={() => toast.success('Saved', { label: 'Undo', onClick: () => undefined })}>Success</Button>
          <Button variant="destructive" onClick={() => toast.error('Failed')}>
            Error
          </Button>
          <Button variant="secondary" onClick={() => toast.warning('Check VAT')}>
            Warning
          </Button>
          <Button variant="ghost" onClick={() => toast.information('Synced')}>
            Information
          </Button>
        </div>
      );
    case 'alert':
      return (
        <div style={{ display: 'grid', gap: 12, width: '100%' }}>
          <Alert tone="information" title="Hint" description="Use filters to narrow the list." />
          <Alert tone="success" title="Imported" description="24 contacts added." />
          <Alert tone="warning" title="Quota" description="You are near the plan limit." />
          <Alert tone="destructive" title="Rejected" description="The file could not be read." action={<Button size="sm">Retry</Button>} />
        </div>
      );
    case 'progress':
      return (
        <div style={{ display: 'grid', gap: 12, width: '100%' }}>
          <Progress value={40} label="Import" />
          <Progress value={70} tone="success" size="sm" label="Done" />
          <Progress indeterminate label="Working" />
        </div>
      );
    case 'spinner':
      return (
        <div className="showcase-row">
          <Spinner size="sm" />
          <Spinner />
          <Spinner size="lg" label="Refreshing" />
        </div>
      );
    default:
      return null;
  }
}

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import { useState } from 'react';
import {
  Alert,
  Avatar,
  Badge,
  Breadcrumbs,
  Button,
  ButtonGroup,
  Checkbox,
  Combobox,
  Dialog,
  EmptyState,
  EvotechlyUIProvider,
  IconButton,
  Input,
  Pagination,
  Progress,
  RadioGroup,
  Select,
  Skeleton,
  Spinner,
  Switch,
  Tabs,
  Textarea,
  Topbar,
} from '../src';
import { Plus } from '@phosphor-icons/react';

function wrap(ui: React.ReactElement) {
  return render(<EvotechlyUIProvider>{ui}</EvotechlyUIProvider>);
}

describe('foundations', () => {
  it('renders button variants and loading', async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    wrap(
      <Button variant="primary" loading={false} onClick={onClick}>
        Save
      </Button>,
    );
    await user.click(screen.getByRole('button', { name: 'Save' }));
    expect(onClick).toHaveBeenCalled();
    wrap(
      <Button loading variant="destructive">
        Save
      </Button>,
    );
    expect(screen.getByRole('button', { name: /loading/i })).toBeDisabled();
  });

  it('renders an accessible icon button', () => {
    wrap(<IconButton label="Add record" icon={<Plus />} />);
    expect(screen.getByRole('button', { name: 'Add record' })).toBeInTheDocument();
  });

  it('supports segmented button groups', async () => {
    const user = userEvent.setup();
    function Demo() {
      const [value, setValue] = useState('week');
      return (
        <ButtonGroup segmented value={value} onValueChange={setValue}>
          <Button value="day">Day</Button>
          <Button value="week">Week</Button>
        </ButtonGroup>
      );
    }
    wrap(<Demo />);
    await user.click(screen.getByRole('button', { name: 'Day' }));
    expect(screen.getByRole('button', { name: 'Day' })).toHaveAttribute('data-active', 'true');
  });

  it('shows input errors and helper text', () => {
    wrap(<Input label="Email" type="email" error="Required" />);
    expect(screen.getByLabelText('Email')).toHaveAttribute('aria-invalid', 'true');
    expect(screen.getByText('Required')).toBeInTheDocument();
  });

  it('counts textarea characters', async () => {
    const user = userEvent.setup();
    wrap(<Textarea label="Notes" showCount maxLength={20} />);
    await user.type(screen.getByLabelText('Notes'), 'Hello');
    expect(screen.getByText(/5 \/ 20/)).toBeInTheDocument();
  });
});

describe('form controls', () => {
  it('selects an option', async () => {
    const user = userEvent.setup();
    wrap(
      <Select
        label="Stage"
        options={[
          { value: 'new', label: 'New' },
          { value: 'won', label: 'Won', disabled: true },
        ]}
      />,
    );
    const trigger = screen.getByRole('combobox');
    await user.click(trigger);
    const option = await screen.findByRole('option', { name: 'New' });
    await user.click(option);
    expect(screen.getByRole('combobox')).toHaveTextContent('New');
  });

  it('filters combobox options', async () => {
    const user = userEvent.setup();
    wrap(
      <Combobox
        label="Owner"
        options={[
          { value: 'ada', label: 'Ada' },
          { value: 'linus', label: 'Linus' },
        ]}
      />,
    );
    await user.click(screen.getByRole('button', { name: /search/i }));
    await user.type(screen.getByLabelText('Owner'), 'lin');
    expect(screen.queryByRole('button', { name: 'Ada' })).not.toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Linus' }));
    expect(screen.getByRole('button', { name: /linus/i })).toBeInTheDocument();
  });

  it('toggles checkbox including indeterminate label', () => {
    wrap(<Checkbox label="Accept" />);
    expect(screen.getByText('Accept')).toBeInTheDocument();
  });

  it('selects a radio option', async () => {
    const user = userEvent.setup();
    wrap(
      <RadioGroup
        legend="Plan"
        options={[
          { value: 'solo', label: 'Solo' },
          { value: 'team', label: 'Team' },
        ]}
      />,
    );
    await user.click(screen.getByText('Team'));
    expect(screen.getByRole('radio', { name: /team/i })).toBeChecked();
  });

  it('toggles a switch', async () => {
    const user = userEvent.setup();
    function Demo() {
      const [on, setOn] = useState(false);
      return <Switch label="Advanced" checked={on} onCheckedChange={setOn} />;
    }
    wrap(<Demo />);
    await user.click(screen.getByRole('switch'));
    expect(screen.getByRole('switch')).toBeChecked();
  });
});

describe('navigation and display', () => {
  it('renders tabs and breadcrumbs', async () => {
    const user = userEvent.setup();
    wrap(
      <>
        <Breadcrumbs
          items={[
            { label: 'Home', href: '/' },
            { label: 'Contacts', href: '/contacts' },
            { label: 'Ada' },
          ]}
        />
        <Tabs
          items={[
            { value: 'one', label: 'One', content: 'First' },
            { value: 'two', label: 'Two', content: 'Second' },
          ]}
        />
      </>,
    );
    expect(screen.getByText('Ada')).toHaveAttribute('aria-current', 'page');
    await user.click(screen.getByRole('tab', { name: 'Two' }));
    expect(screen.getByText('Second')).toBeInTheDocument();
  });

  it('paginates', async () => {
    const user = userEvent.setup();
    const onPageChange = vi.fn();
    wrap(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />);
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });

  it('renders feedback primitives', () => {
    wrap(
      <>
        <Badge tone="success">Won</Badge>
        <Avatar initials="AL" alt="Ada Lovelace" />
        <EmptyState title="No deals" description="Create one to start." />
        <Skeleton variant="text" />
        <Alert tone="warning" title="Quota" description="Approaching limit." />
        <Progress value={40} label="Upload" />
        <Spinner label="Saving" />
        <Topbar title="Inbox" breadcrumbs={[{ label: 'Inbox' }]} />
      </>,
    );
    expect(screen.getByText('Won')).toBeInTheDocument();
    expect(screen.getByLabelText('Ada Lovelace')).toBeInTheDocument();
    expect(screen.getByRole('alert')).toHaveTextContent('Quota');
    expect(screen.getByRole('status')).toHaveTextContent('Saving');
  });
});

describe('overlays', () => {
  it('opens a dialog and keeps the title', async () => {
    const user = userEvent.setup();
    wrap(
      <Dialog title="Create contact" description="Local only." trigger={<Button>Open</Button>}>
        <Input label="Name" />
      </Dialog>,
    );
    await user.click(screen.getByRole('button', { name: 'Open' }));
    expect(screen.getByRole('dialog')).toHaveAccessibleName('Create contact');
  });
});

describe('accessibility', () => {
  it('has no serious axe violations on a form cluster', async () => {
    const { container } = wrap(
      <form>
        <Input label="Email" type="email" />
        <Checkbox label="Remember" />
        <Button>Submit</Button>
      </form>,
    );
    const results = await axe(container);
    expect(results.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);
  });

  it('has no serious axe violations on display and feedback primitives', async () => {
    const { container } = wrap(
      <>
        <ButtonGroup>
          <Button>One</Button>
          <Button>Two</Button>
        </ButtonGroup>
        <Textarea label="Notes" />
        <Switch label="Advanced" />
        <RadioGroup legend="Plan" options={[{ value: 'solo', label: 'Solo' }]} />
        <Breadcrumbs items={[{ label: 'Home', href: '/' }, { label: 'Here' }]} />
        <Badge tone="success">Won</Badge>
        <Avatar initials="AL" alt="Ada Lovelace" />
        <Pagination page={1} pageCount={3} />
        <EmptyState title="Empty" description="Nothing yet." />
        <Skeleton variant="text" />
        <Alert tone="information" title="Hint" description="Use filters." />
        <Progress value={40} label="Upload" />
        <Spinner label="Saving" />
        <Tabs items={[{ value: 'one', label: 'One', content: 'First' }]} />
      </>,
    );
    const results = await axe(container);
    expect(results.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);
  });
});

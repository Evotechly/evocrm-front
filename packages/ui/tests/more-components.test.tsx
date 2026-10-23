import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  CommandMenu,
  DataTable,
  DatePicker,
  Drawer,
  DropdownMenu,
  DropdownMenuItem,
  EvotechlyUIProvider,
  Sidebar,
  Button,
} from '../src';

function wrap(ui: React.ReactElement) {
  return render(<EvotechlyUIProvider>{ui}</EvotechlyUIProvider>);
}

describe('completed partials', () => {
  it('sorts and paginates a data table', async () => {
    const user = userEvent.setup();
    wrap(
      <DataTable
        pageSize={1}
        data={[
          { name: 'Zoe', stage: 'Open' },
          { name: 'Ada', stage: 'Won' },
        ]}
        columns={[
          { accessorKey: 'name', header: 'Name' },
          { accessorKey: 'stage', header: 'Stage' },
        ]}
      />,
    );
    expect(screen.getByText('Zoe')).toBeInTheDocument();
    await user.click(screen.getByRole('button', { name: 'Next' }));
    expect(screen.getByText('Ada')).toBeInTheDocument();
    await user.click(screen.getByRole('columnheader', { name: 'Name' }));
  });

  it('opens a date picker calendar', async () => {
    const user = userEvent.setup();
    wrap(<DatePicker label="Close date" />);
    await user.click(screen.getByRole('button', { name: /select date|close date/i }));
    expect(document.querySelector('.ev-calendar')).toBeTruthy();
  });

  it('renders sidebar items and a command menu', async () => {
    wrap(<Sidebar items={[{ id: 'home', label: 'Home', active: true }]} />);
    expect(screen.getAllByText('Home').length).toBeGreaterThan(0);
    wrap(<CommandMenu open items={[{ id: 'go', label: 'Go home' }]} />);
    expect(screen.getByPlaceholderText('Search commands')).toBeInTheDocument();
  });

  it('opens a drawer', async () => {
    const user = userEvent.setup();
    wrap(
      <Drawer title="Filters" description="Narrow the list" trigger={<Button>Filters</Button>}>
        Content
      </Drawer>,
    );
    await user.click(screen.getByRole('button', { name: 'Filters' }));
    expect(screen.getByRole('dialog', { name: 'Filters' })).toBeInTheDocument();
  });

  it('opens a dropdown menu', async () => {
    const user = userEvent.setup();
    wrap(
      <DropdownMenu trigger={<Button>Menu</Button>}>
        <DropdownMenuItem>Edit</DropdownMenuItem>
      </DropdownMenu>,
    );
    await user.click(screen.getByRole('button', { name: 'Menu' }));
    expect(await screen.findByRole('menuitem', { name: 'Edit' })).toBeInTheDocument();
  });
});

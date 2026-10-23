import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { axe } from 'vitest-axe';
import {
  Button,
  EvotechlyUIProvider,
  Popover,
  Tooltip,
  toast,
} from '../src';

function wrap(ui: React.ReactElement) {
  return render(<EvotechlyUIProvider>{ui}</EvotechlyUIProvider>);
}

describe('overlays remaining', () => {
  it('shows a tooltip on hover and hides it when disabled', async () => {
    const user = userEvent.setup();
    const { rerender } = wrap(
      <Tooltip content="Creates a contact" delayDuration={0}>
        <Button>Hover or focus</Button>
      </Tooltip>,
    );
    await user.hover(screen.getByRole('button', { name: 'Hover or focus' }));
    expect(await screen.findByRole('tooltip', { name: 'Creates a contact' })).toBeInTheDocument();

    rerender(
      <EvotechlyUIProvider>
        <Tooltip content="Creates a contact" disabled>
          <Button>Hover or focus</Button>
        </Tooltip>
      </EvotechlyUIProvider>,
    );
    expect(screen.queryByRole('tooltip')).not.toBeInTheDocument();
  });

  it('opens a popover from the trigger', async () => {
    const user = userEvent.setup();
    wrap(<Popover trigger={<Button>More</Button>}>Collision-aware surface.</Popover>);
    await user.click(screen.getByRole('button', { name: 'More' }));
    expect(await screen.findByText('Collision-aware surface.')).toBeInTheDocument();
  });

  it('queues a success toast', async () => {
    const user = userEvent.setup();
    wrap(<Button onClick={() => toast.success('Saved')}>Success</Button>);
    await user.click(screen.getByRole('button', { name: 'Success' }));
    expect(await screen.findByText('Saved')).toBeInTheDocument();
  });

  it('has no serious axe violations on overlay triggers', async () => {
    const { container } = wrap(
      <div>
        <Tooltip content="Hint" delayDuration={0}>
          <Button>Hinted</Button>
        </Tooltip>
        <Popover trigger={<Button>More</Button>}>Details</Popover>
      </div>,
    );
    const results = await axe(container);
    expect(results.violations.filter((item) => item.impact === 'critical' || item.impact === 'serious')).toEqual([]);
  });
});

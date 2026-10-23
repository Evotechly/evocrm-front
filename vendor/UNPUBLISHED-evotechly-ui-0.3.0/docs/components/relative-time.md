# EvoRelativeTime

Status: stable · EvoUI 0.3.0 · DS 2.0 tokens

**Category:** Data display  
**Import:** `import { EvoRelativeTime } from "@evotechly/ui"`  
**Source:** in-house (in-house)  
**Registry:** —

## Purpose

<time> via Intl.RelativeTimeFormat, full date in tooltip, auto-refresh.

## Props

| Prop | Values | Default | Notes |
|------|--------|---------|-------|
| `size` | sm · md · lg | md | 28 / 36 / 44 |
| `variant` | primary · secondary · outline · ghost · danger · link | primary | When relevant |
| `tone` | neutral · brand · success · warning · danger · info | neutral | Never color alone |
| `asChild` | boolean | false | Radix Slot when the root is a trigger |

## Usage

```tsx
import { EvoRelativeTime } from "@evotechly/ui";

<EvoRelativeTime date="2026-10-23T12:00:00Z" />
```

## Do

- Set `data-product` and `data-theme` on `<html>`.
- Use `--brand-actionA11y` for primary actions and `--brand-text` for brand-colored text.
- Keep a visible focus ring (2px `--brand-action`, 2px offset).

## Don't

- Do not hard-code hex, rgb, or Tailwind arbitrary colors.
- Do not depend on EvoCRM or Next.js.
- Do not ship unlabeled icon-only controls.

## Accessibility

- Preferred role: `time`.
- Keyboard and focus are required; do not remove outlines.
- Pair status color with a label.

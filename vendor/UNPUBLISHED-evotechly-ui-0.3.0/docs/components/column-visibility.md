# EvoColumnVisibility

Status: stable · EvoUI 0.3.0 · DS 2.0 tokens

**Category:** Tables  
**Import:** `import { EvoColumnVisibility } from "@evotechly/ui"`  
**Source:** in-house (in-house)  
**Registry:** —

## Purpose

TanStack table column toggle menu + saved views.

## Props

| Prop | Values | Default | Notes |
|------|--------|---------|-------|
| `size` | sm · md · lg | md | 28 / 36 / 44 |
| `variant` | primary · secondary · outline · ghost · danger · link | primary | When relevant |
| `tone` | neutral · brand · success · warning · danger · info | neutral | Never color alone |
| `asChild` | boolean | false | Radix Slot when the root is a trigger |

## Usage

```tsx
import { EvoColumnVisibility } from "@evotechly/ui";

<EvoColumnVisibility columns={[{id:"name",label:"Name",visible:true}]} />
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

- Preferred role: `group`.
- Keyboard and focus are required; do not remove outlines.
- Pair status color with a label.

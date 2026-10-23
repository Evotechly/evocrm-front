# EvoEmailComposer

Status: stable · EvoUI 0.3.0 · DS 2.0 tokens

**Category:** CRM domain  
**Import:** `import { EvoEmailComposer } from "@evotechly/ui"`  
**Source:** in-house (in-house)  
**Registry:** —

## Purpose

Composer with to/cc chips, subject, Tiptap body, templates, attachments, send/schedule.

## Props

| Prop | Values | Default | Notes |
|------|--------|---------|-------|
| `size` | sm · md · lg | md | 28 / 36 / 44 |
| `variant` | primary · secondary · outline · ghost · danger · link | primary | When relevant |
| `tone` | neutral · brand · success · warning · danger · info | neutral | Never color alone |
| `asChild` | boolean | false | Radix Slot when the root is a trigger |

## Usage

```tsx
import { EvoEmailComposer } from "@evotechly/ui";

<EvoEmailComposer />
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

- Preferred role: `form`.
- Keyboard and focus are required; do not remove outlines.
- Pair status color with a label.

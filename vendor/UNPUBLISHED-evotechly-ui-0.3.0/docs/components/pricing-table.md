# EvoPricingTable

Status: stable · EvoUI 0.3.0 · DS 2.0 tokens

**Category:** CRM domain  
**Import:** `import { EvoPricingTable } from "@evotechly/ui"`  
**Source:** @spectrumui/blueprint-tiers (Apache-2.0)  
**Registry:** https://ui.spectrumhq.in/r/blueprint-tiers.json

## Purpose

Pricing table restyled onto Brandbook tokens. Activate with `<html data-product data-theme>`.

## Props

| Prop | Values | Default | Notes |
|------|--------|---------|-------|
| `size` | sm · md · lg | md | 28 / 36 / 44 |
| `variant` | primary · secondary · outline · ghost · danger · link | primary | When relevant |
| `tone` | neutral · brand · success · warning · danger · info | neutral | Never color alone |
| `asChild` | boolean | false | Radix Slot when the root is a trigger |

## Usage

```tsx
import { EvoPricingTable } from "@evotechly/ui";

<EvoPricingTable plans={[{id:"pro",name:"Pro",price:"9 000 DZD"}]} />
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

- Preferred role: `list`.
- Keyboard and focus are required; do not remove outlines.
- Pair status color with a label.

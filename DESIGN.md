---
name: "EvoCRM — Evotechly Aurora"
description: "Quiet precision with voltage for French-first sales work."
colors:
  brand: "#0f4c5c"
  brand-deep: "#0a3642"
  brand-soft: "#e6f1f3"
  on-brand: "#fff"
  voltage: "#4f46e5"
  voltage-deep: "#3730a3"
  voltage-soft: "#eef2ff"
  on-action: "#fff"
  indigo: "#4f46e5"
  ink: "#0d1b24"
  muted-strong: "#425568"
  muted: "#56677b"
  canvas: "#fff"
  canvas-soft: "#f0f5fa"
  surface: "#fff"
  surface-raised: "#fafbfc"
  border: "#e3e8ee"
  border-strong: "#c3ceda"
  orange: "#ec6025"
  orange-text: "#ad410f"
  orange-soft: "#fff1e8"
  success: "#087450"
  success-soft: "#e8f7ee"
  warning: "#875700"
  warning-soft: "#fff6db"
  demo: "#b31d61"
  demo-soft: "#fdf0f6"
  demo-source: "#db2777"
  danger: "#b52b36"
  danger-soft: "#fff0f1"
  chart-track: "#edf0f7"
  chart-second: "#0f4c5c"
  chart-third: "#818cf8"
  overlay: "rgba(13, 27, 36, 0.38)"
  dark-brand: "#8ad0d5"
  dark-brand-deep: "#b3e5e8"
  dark-brand-soft: "#15303a"
  dark-on-brand: "#0a252c"
  dark-voltage: "#aaa4ff"
  dark-voltage-deep: "#c8c3ff"
  dark-voltage-soft: "#272644"
  dark-on-action: "#13102c"
  dark-indigo: "#b8b1ff"
  dark-ink: "#edf3f9"
  dark-muted-strong: "#c2d0dc"
  dark-muted: "#a2b3c4"
  dark-canvas: "#0e1419"
  dark-canvas-soft: "#05080c"
  dark-surface: "#12181e"
  dark-surface-raised: "#17212a"
  dark-border: "#26333f"
  dark-border-strong: "#405162"
  dark-orange-text: "#ffbc91"
  dark-orange-soft: "#39291d"
  dark-success: "#80d9ac"
  dark-success-soft: "#163328"
  dark-warning: "#eacc89"
  dark-warning-soft: "#342d1c"
  dark-demo: "#f5acd0"
  dark-demo-soft: "#321d2a"
  dark-danger: "#ffa1a9"
  dark-danger-soft: "#3a2028"
  dark-chart-track: "#25323e"
  dark-chart-second: "#67bdc5"
  dark-chart-third: "#7c72d4"
typography:
  headline:
    fontFamily: "'Geist Sans', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "28px"
    fontWeight: 600
    lineHeight: 1.25
    letterSpacing: "-0.025em"
  title:
    fontFamily: "'Geist Sans', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "15px"
    fontWeight: 600
    lineHeight: 1.25
  body:
    fontFamily: "'Geist Sans', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "14px"
    fontWeight: 400
    lineHeight: 1.5
  label:
    fontFamily: "'Geist Sans', Inter, system-ui, -apple-system, sans-serif"
    fontSize: "12px"
    fontWeight: 500
  money:
    fontFamily: "'Geist Mono', ui-monospace, monospace"
    fontSize: "12px"
rounded:
  sm: "8px"
  md: "12px"
  lg: "16px"
  pill: "9999px"
spacing:
  1: "4px"
  2: "8px"
  3: "12px"
  4: "16px"
  5: "24px"
  6: "32px"
  7: "48px"
components:
  button-primary:
    textColor: "{colors.on-action}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    typography: "{typography.label}"
    backgroundColor: "{colors.voltage}"
  button-default:
    textColor: "{colors.muted-strong}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    typography: "{typography.label}"
    backgroundColor: "{colors.surface}"
  button-ghost:
    textColor: "{colors.brand}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    typography: "{typography.label}"
  button-soft:
    textColor: "{colors.indigo}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    typography: "{typography.label}"
    backgroundColor: "{colors.voltage-soft}"
  button-danger:
    textColor: "{colors.danger}"
    rounded: "{rounded.sm}"
    padding: "8px 12px"
    typography: "{typography.label}"
    backgroundColor: "{colors.danger-soft}"
  input:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.sm}"
    padding: "9px 11px"
  nav-active:
    backgroundColor: "{colors.brand-soft}"
    textColor: "{colors.brand}"
    rounded: "{rounded.sm}"
    padding: "10px 12px"
  badge-success:
    backgroundColor: "{colors.success-soft}"
    textColor: "{colors.success}"
    padding: "3px 7px"
  panel:
    backgroundColor: "{colors.surface}"
    rounded: "{rounded.md}"
  demo-banner:
    backgroundColor: "{colors.demo-soft}"
    textColor: "{colors.demo}"
    padding: "8px 32px"
---

# Design System: EvoCRM — Evotechly Aurora

## Overview

**Creative North Star: "Aurora Light Cabinet"**

Aurora Light Cabinet applies Evotechly’s established Aurora identity to dense CRM work: quiet precision with voltage. Teal carries company identity and relationships; indigo carries the primary action. Cool workspaces, clear labels and restrained hairlines keep records readable.

This records the built five-screen system and shared UI, grounded in Evotechly/Brandbook 1.1.0 and the verified source in docs/research/aurora-brandbook-source.json. HubSpot and Salesforce references inform object views, relationship context and modular sales analysis; their branding and imagery are not adopted. The prior cream/monochrome treatment was explicitly rejected. User visual approval and five approved Figma comparisons remain pending; documentation is not visual acceptance.

**Key Characteristics:**

- Teal identity and selected relationships; voltage indigo actions.
- Cool neutral panels in matched light and night themes.
- Geist Sans interface; Geist Mono and tabular monetary values.
- Compact controls, readable scopes and honest local-demo state.

## Colors

Aurora pairs deep company teal with voltage indigo against a cool neutral workspace. Frontmatter records literal source values; `dark-*` entries correspond to overrides under the dark theme attribute, not a second palette to mix into light mode. Runtime aliases `action`, `focus`, `teal`, `indigo` and `chart` retain their source relationships.

### Primary

- **Company Teal** (`brand`, `brand-deep`, `brand-soft`, `on-brand`): identity, active sidebar entries, record links and relationship surfaces.
- **Voltage Indigo** (`voltage`, `voltage-deep`, `voltage-soft`, `on-action`): primary buttons, focus and analytic emphasis.

### Secondary

- **Legacy Orange** (`orange`, `orange-text`, `orange-soft`): sparse product or metric accent; not the suite identity.
- **State Pairs** (`success`, `warning`, `danger` and their soft roles): meaningful status, feedback and validation.
- **Demonstration Pink** (`demo-source`): canonical Aurora state-demo origin. `demo` and `demo-soft` are distinct accessible light/dark text and surface pairs for the global banner and simulation badge.

### Neutral

- **Deep Ink and Muted Ink** (`ink`, `muted-strong`, `muted`): content hierarchy.
- **Cool Canvas and Work Surfaces** (`canvas`, `canvas-soft`, `surface`, `surface-raised`): shell, panels and tonal layering.
- **Hairlines** (`border`, `border-strong`): panel separation and control boundaries.
- **Night Roles** (`dark-*`): night canvas, elevated chrome and work panels with light text and softened chromatic pairs.

**The Role Separation Rule.** Keep teal for identity and relationships, indigo for primary action and focus, and semantic colors for actual state.

## Typography

**Body and heading font:** self-hosted Geist Sans, with Inter and system sans fallbacks. **Monetary and code font:** Geist Mono, with UI monospace fallback. The system has an interface hierarchy, not a marketing display face.

### Hierarchy

- **Headline:** page titles use the frontmatter headline role; phone titles reduce to (26px).
- **Title:** section headings use the title role; panel headings also use (14px), drawer headings (18px).
- **Body:** base copy uses the body role; table cells and secondary utility copy use (12px), forms and record links (13px).
- **Label:** compact medium labels; table headings use (10px), uppercase and (0.04em) tracking for data columns, not decorative page eyebrows.
- **Money:** base table amount role in frontmatter, with tabular figures and no wrapping. Monetary KPI values use (20px), reducing to (15px) on phones. Chart totals use (24px), reducing to (20px); quote-summary totals use (24px). Count KPIs remain Sans and have their own responsive scale.

**The Financial Precision Rule.** Render actual amounts in Geist Mono with tabular figures and the shared DZD formatter’s two decimal places; keep complete amounts visible at small widths.

## Layout

The desktop shell uses a labeled sidebar (232px), sticky contextual header (64px) and content maximum (1600px). Content padding is (28px 32px 40px), narrowing at (1200px) and (600px). Page stacks use (22px) gaps, reducing to (18px) on phones. Shared spacing primitives are listed in frontmatter; local data-density adjustments remain component specific.

At (900px) and below, the sidebar gives way to a menu trigger. At (600px) and below, the header becomes (58px), headings stack, filter controls take full rows, the inbox switches between list and conversation, and relationship context stacks. Contacts use record cards below (480px); wide tables and the pipeline retain contained horizontal scrolling. Metric grids move from four to two columns; quote metrics stack on phones. The inbox gains a third context column at (1280px).

Quick views sit above actual object filters and share their state. Filter scopes retain their full labels with a desktop minimum (205px), then full-width phone rows. The dashboard’s fixture-derived stage ring and bars describe the same distribution; they are a surface pattern, not a mandate for every page.

## Elevation & Depth

Resting panels are flat, white or night surfaces framed by a hairline. Raised backgrounds distinguish filter bars, table headers and conversation areas. Soft shadows belong to transient surfaces; overlay shadows separate dialogs and drawers. Exact light/dark shadow values live in the sidecar and source custom properties.

**The Hairlines First Rule.** Separate resting work surfaces with tonal layers and hairlines. Reserve shadows for popovers, notifications and overlays.

## Shapes

Controls and linked-record blocks use the small radius; panels and centered dialogs use the medium radius. Avatars and status dots are circular. Dense badges use local corners (5px). Drawers align flush to the viewport edge; centered dialogs retain rounded corners. Do not generalize a one-off radius into a new scale step.

## Components

### Buttons

Compact, calm and explicit. The shared control has minimum height (36px), small corners, medium label type and padding (8px 12px). Primary uses action/on-action, deepening on hover; default uses a work surface and strong hairline. Ghost uses transparent teal text; soft uses the voltage tint; danger uses the danger pair. Hover adjusts background and border; disabled buttons lower opacity to (0.48). Visible focus uses a (2px) voltage outline offset (3px).

### Chips

Status badges use compact padding (3px 7px), local corners (5px), (10px) medium text and a current-color dot. State text is paired with its soft background. Simulation is a separate demo pill, not a success status.

### Cards / Containers

Panels use medium corners, surface backgrounds and a single hairline. Header and body padding typically use (16px 20px) and (20px). KPI cards use (20px) padding and a compact icon tile. Mobile KPI padding narrows to (16px 12px); monetary values preserve full precision through the separate financial type rules.

### Inputs / Fields

Native inputs, selects and textareas use a strong hairline, small corners, surface background, minimum height (38px) and padding (9px 11px). Search fields have a leading icon and focus-within outline offset (2px). Invalid fields expose danger borders and error text; disabled fields lower opacity to (0.5). Labels remain visible above scope selectors.

### Navigation

Sidebar rows have minimum height (42px), padding (10px 12px), small corners and (13px) type. Active rows use teal-soft with semibold teal text; hover uses the cool canvas. Object quick views use text and a bottom rule for selection with compact count badges. They scroll within their strip when needed. The mobile menu reuses the sidebar contents in an overlay.

### Demonstration and overlays

The slim global banner and simulated-reply pill use the demo pair, derived from canonical Aurora pink. The banner icon retains the canonical origin color. Dialogs use a viewport-bounded width up to (660px); drawers up to (520px). Overlay headers use a teal tint, with scrollable bodies and protected focus through existing Radix components. Interactive transitions use (150ms); drawer entry uses (220ms). Reduced-motion preferences shorten animation and transition duration.

## Do's and Don'ts

### Do:

- Do use the existing semantic custom properties so light and dark themes retain their roles.
- Do keep primary actions indigo and selected relationship navigation teal.
- Do format monetary values with formatDzd, Geist Mono and tabular figures; format complete absolute dates as DD/MM/YYYY while retaining relative labels.
- Do preserve full filter scope labels: desktop fields have a minimum width of 205px and become full rows on phones.
- Do distinguish local demonstrations and simulated replies with the demo pink roles.

### Don't:

- Don’t replace Aurora with HubSpot or Salesforce branding or copy their reference imagery into the product.
- Don’t reintroduce the rejected cream/monochrome identity.
- Don’t introduce marketing mesh into operational record cards.
- Don’t imply server persistence, real sending or invented historic financial performance.
- Don’t treat automated checks or this document as user visual approval.

# Aurora integration

Brand source: `Evotechly/Brandbook`, Aurora `1.1.0-aurora`, `DESIGN.md` and token contract read on 2026-10-18.

The implementation consumes semantic CSS variables in `src/styles/tokens.css`. The initial product face is Aurora Light Cabinet: near-white canvas, hairline borders, compact 8–12px radii, dark ink typography, restrained orange product accent, and Geist-first font stacks. Dark mode maps the same semantic names to dark surfaces.

Brandbook remains the source of truth. If `@evotechly/brand` becomes installable, the synchronization step should pin its version and regenerate these variables from its published token artifact rather than hand-editing component styles.

Reference tokens used by this foundation include Ink `#0D1B24`, Orange `#EC6025`, Border `#E6E8E3`, and the Aurora semantic surface/feedback families. Component code uses variables only.

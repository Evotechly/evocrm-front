# Unpublished Evotechly packages (local snapshot)

This folder vendors **unpublished** Design System packages so EvoCRM can consume `@evotechly/ui@0.3.0` without publishing.

| Package | Path | Notes |
| --- | --- | --- |
| `@evotechly/ui` `0.3.0` | `UNPUBLISHED-evotechly-ui-0.3.0` | Exact Brandbook PR #13 `packages/ui` (113 components, `src` + `dist` + docs + **NOTICE**). Entry points resolve `src/index.ts` so the AGENTS.md / catalog surface (`EvoButton`, `EvoKanban`, …) is the one the app imports. Do **not** publish. |
| `@evotechly/brand` `2.0.0` | `evotechly-brand-2.0.0` | Token snapshot used by the UI package (`workspace:*`). |

## TODO

When Brandbook 0.3.0 is approved and published to GitHub Packages:

```bash
pnpm add @evotechly/ui@0.3.0 @evotechly/brand@2.0.0
```

Then delete this `vendor/` folder and keep `vercel.json` `installCommand` (it still authenticates `@evotechly` on GitHub Packages).

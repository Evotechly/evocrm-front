# Unpublished Evotechly packages (local snapshot)

This folder vendors **unpublished** Design System packages so EvoCRM can consume `@evotechly/ui@0.3.0` without publishing.

| Package | Path | Notes |
| --- | --- | --- |
| `@evotechly/ui` `0.3.0` | `UNPUBLISHED-evotechly-ui-0.3.0` | Do **not** publish. Brandbook draft PR #13 (`cursor/evoui-v030-a23f`) was not cloneable from this workspace. |
| `@evotechly/brand` `2.0.0` | `evotechly-brand-2.0.0` | Token snapshot used by the UI package. |

## TODO

When Brandbook 0.3.0 is approved and published to GitHub Packages:

```bash
pnpm add @evotechly/ui@0.3.0 @evotechly/brand@2.0.0
```

Then delete this `vendor/` folder and keep `vercel.json` `installCommand` (it still authenticates `@evotechly` on GitHub Packages).

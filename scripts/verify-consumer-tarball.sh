#!/usr/bin/env bash
set -euo pipefail
root="$(cd "$(dirname "$0")/.." && pwd)"
cd "$root"
pnpm --filter @evotechly/brand build
pnpm --filter @evotechly/ui build
pack_dir="$(mktemp -d)"
trap 'rm -rf "$pack_dir"' EXIT
pnpm --filter @evotechly/ui pack --pack-destination "$pack_dir"
tarball="$(ls "$pack_dir"/evotechly-ui-*.tgz)"
work="$(mktemp -d)"
trap 'rm -rf "$pack_dir" "$work"' EXIT
cd "$work"
pnpm init
pnpm add "$tarball" react react-dom
node --input-type=module -e "import { Button } from '@evotechly/ui'; if (!Button) throw new Error('export missing'); console.log('tarball exports Button');"

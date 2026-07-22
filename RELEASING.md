# Releasing a new version

Manual release checklist for `@stereopt/data-table`. No CI/CD is set up — every step below is done by hand on your machine.

## 1. Decide the version bump

This package is pre-1.0 (`0.x.y`), so npm's caret range (`^0.2.5`) only auto-updates consumers on **patch** bumps, not minor ones. Use that to your advantage:

- **Patch** (`0.2.5` → `0.2.6`): bug fix, no API change. Safe to let existing consumers pick up automatically.
- **Minor** (`0.2.5` → `0.3.0`): new feature or prop, backwards compatible. Consumers must opt in (bump their range).
- **Major** (`0.x.y` → `1.0.0`, or later `1.x.y` → `2.0.0`): breaking change.

If you're unsure whether a change is breaking, treat it as breaking.

## 2. Make your changes on a branch

Don't commit improvements directly to `main`. `main` should always reflect what's actually published.

```bash
git checkout -b feat/whatever-you-are-doing
```

## 3. Lint and build locally

```bash
npm run lint
npm run build
```

Fix anything that fails before moving on. There's no automated test suite, so this build + a manual smoke test (next step) is your only safety net — don't skip it.

## 4. Smoke-test in a real consumer project before publishing

This is the step that actually catches breakage, since there are no automated tests.

```bash
npm run build
npm pack   # creates stereopt-data-table-<version>.tgz in this repo
```

In one of your consumer projects:

```bash
npm install /absolute/path/to/stereopt-data-table-<version>.tgz
```

Run that project and click through the table (sorting, filters, pagination, theming) to confirm nothing broke. When done, revert that project's `package.json`/lockfile change (don't leave it pointing at a local tarball).

## 5. Bump the version and tag

```bash
npm version patch   # or: npm version minor / npm version major
```

This updates `package.json`, commits, and creates a git tag (`vX.Y.Z`) in one step.

## 6. Merge to main

```bash
git checkout main
git merge feat/whatever-you-are-doing
```

## 7. Publish to npm

```bash
npm login   # if your session expired
npm publish --access public
```

`prepublishOnly` runs `clean` + `build` automatically, so `dist/` is always rebuilt fresh before publishing.

## 8. Push

```bash
git push origin main --follow-tags
```

`--follow-tags` pushes the version tag created by `npm version` along with the commit.

## Quick reference

| Step | Command |
|---|---|
| Lint | `npm run lint` |
| Build | `npm run build` |
| Pack for local testing | `npm pack` |
| Bump + tag | `npm version patch\|minor\|major` |
| Publish | `npm publish --access public` |
| Push commit + tag | `git push origin main --follow-tags` |

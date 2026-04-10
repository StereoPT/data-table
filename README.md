# @stereopt/data-table

Simple React data table component packaged as an npm library.

## Getting started

Install dependencies:

```bash
npm install
```

Build the package:

```bash
npm run build
```

Run the build in watch mode while developing:

```bash
npm run dev
```

## Usage

```tsx
import { DataTable } from '@stereopt/data-table';
import '@stereopt/data-table/styles.css';

export function Example() {
  return <DataTable />;
}
```

The package stylesheet ships the component utilities only. It does not include Tailwind preflight, so it will not reset the consuming application's global styles.

The components also inherit the host application's theme automatically when the app exposes common semantic CSS variables such as `--background`, `--foreground`, `--primary`, `--muted`, `--border`, and related tokens. If needed, you can override the library specifically with the prefixed variables `--st-dt-*`.

## GitHub repository

Repository: https://github.com/StereoPT/data-table

## npm publishing

1. Update the `name` field in `package.json` if you want a different npm package name.
2. Bump the version in `package.json`.
3. Log in to npm with `npm login`.
4. Publish with `npm publish --access public`.

If you use an npm scope such as `@stereopt`, make sure that scope exists in your npm organization.
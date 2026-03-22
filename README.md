# aniliberty-ts-sdk

TypeScript SDK for the AniLiberty OpenAPI v1 API.

## Installation

### Published package

```bash
bun add aniliberty-ts-sdk
```

### From GitHub in a Bun project, without a build

Bun can consume the repository TypeScript source directly through the `bun` export condition, so you can depend on the GitHub repo without requiring a prebuilt `dist/` directory.

```bash
bun add github:anilibria/aniliberty-ts-sdk
```

If you want to pin a branch, tag, or commit:

```bash
bun add github:anilibria/aniliberty-ts-sdk#main
bun add github:anilibria/aniliberty-ts-sdk#v1.0.0
bun add github:anilibria/aniliberty-ts-sdk#<commit>
```

## Development

```bash
bun install
bun run generate:types
bun run check
bun run build
```

## Usage

```ts
import { SDK } from 'aniliberty-ts-sdk';

const sdk = new SDK({
  baseUrl: 'https://anilibria.top/api/v1',
});

const profile = await sdk.users.getProfile();
const collections = await sdk.collections.getIds();

const loginResponse = await sdk.auth.login('login', 'password');
console.log(loginResponse, profile, collections);
```

## Bun project example using the GitHub repository

After installing with `bun add github:anilibria/aniliberty-ts-sdk`, you can import the package normally:

```ts
import { SDK } from 'aniliberty-ts-sdk';

const sdk = new SDK({
  baseUrl: 'https://anilibria.top/api/v1',
});

const profile = await sdk.users.getProfile();
console.log(profile);
```

No extra build step is required in the consuming Bun project.

## Scripts

- `bun run generate:types` regenerates `src/models/types.ts` from `v1.json`.
- `bun run check` runs the TypeScript typecheck without emitting files.
- `bun run build` compiles the package into `dist/`.

## Publishing notes

The published package includes the generated `dist/` build output, but the repository does not track that directory.

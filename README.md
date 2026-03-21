# aniliberty-ts-sdk

TypeScript SDK for the AniLiberty OpenAPI v1 API.

## Installation

```bash
npm install aniliberty-ts-sdk
```

## Development

```bash
npm install
npm run generate:types
npm run check
npm run build
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

## Scripts

- `npm run generate:types` regenerates `src/models/types.ts` from `v1.json`.
- `npm run check` runs the TypeScript typecheck without emitting files.
- `npm run build` compiles the package into `dist/`.

## Publishing notes

The published package includes the generated `dist/` build output, but the repository does not track that directory.

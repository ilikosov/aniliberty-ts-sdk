import { SDK } from '../src/index.js';

const sdk = new SDK({
  baseURL: 'https://aniliberty.top/api/v1',
  onRequest: ({ method, url }) => {
    console.log(`[request] ${method} ${url}`);
  },
});

async function main() {
  await sdk.auth.login('animeshnik_488', 'password');

  const profile = await sdk.users.getProfile({ include: ['avatar', 'settings'] });
  console.log(profile);

  const releases = await sdk.collections.listReleases({
    type_of_collection: 'WATCHING',
    page: 1,
    limit: 20,
  });

  console.log(releases);

  const controller = new AbortController();
  const timecodesPromise = sdk.users.getTimecodes(new Date(), { signal: controller.signal, retries: 2 });
  controller.abort();
  await timecodesPromise;
}

main().catch(console.error);

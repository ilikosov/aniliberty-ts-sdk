import type { SDKConfig } from './config.js';
import { HttpClient } from './http-client.js';
import { AuthApi } from '../api/auth.api.js';
import { UsersApi } from '../api/users.api.js';
import { CollectionsApi } from '../api/collections.api.js';
import { AuthService } from '../services/auth.service.js';
import { UsersService } from '../services/users.service.js';
import { CollectionsService } from '../services/collections.service.js';

export class SDK {
  public readonly client: HttpClient;
  public readonly auth: AuthService;
  public readonly users: UsersService;
  public readonly collections: CollectionsService;

  public constructor(config: SDKConfig = {}) {
    this.client = new HttpClient(config);

    const authApi = new AuthApi(this.client);
    const usersApi = new UsersApi(this.client);
    const collectionsApi = new CollectionsApi(this.client);

    this.auth = new AuthService(authApi, this.client);
    this.users = new UsersService(usersApi);
    this.collections = new CollectionsService(collectionsApi);
  }
}

import { HttpClient } from './http-client.js';
import { AuthApi } from '../api/auth.api.js';
import { UsersApi } from '../api/users.api.js';
import { CollectionsApi } from '../api/collections.api.js';
import { AuthService } from '../services/auth.service.js';
import { UsersService } from '../services/users.service.js';
import { CollectionsService } from '../services/collections.service.js';
export class SDK {
    client;
    auth;
    users;
    collections;
    constructor(config = {}) {
        this.client = new HttpClient(config);
        const authApi = new AuthApi(this.client);
        const usersApi = new UsersApi(this.client);
        const collectionsApi = new CollectionsApi(this.client);
        this.auth = new AuthService(authApi, this.client);
        this.users = new UsersService(usersApi);
        this.collections = new CollectionsService(collectionsApi);
    }
}

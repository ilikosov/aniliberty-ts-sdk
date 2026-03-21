import type { SDKConfig } from './config.js';
import { HttpClient } from './http-client.js';
import { AuthService } from '../services/auth.service.js';
import { UsersService } from '../services/users.service.js';
import { CollectionsService } from '../services/collections.service.js';
export declare class SDK {
    readonly client: HttpClient;
    readonly auth: AuthService;
    readonly users: UsersService;
    readonly collections: CollectionsService;
    constructor(config?: SDKConfig);
}

import type { HttpClient } from '../core/http-client.js';
import type { ModelsUsersV1User, RequestOptions, ResponsesV1AccountsUsersMeViewsHistory, ResponsesV1AccountsUsersMeViewsTimecodes, UserProfileQuery, ViewHistoryQuery, ViewTimecodeDeleteItem, ViewTimecodeUpsertItem } from '../models/types.js';
export declare class UsersApi {
    private readonly client;
    constructor(client: HttpClient);
    getProfile(query?: UserProfileQuery, options?: RequestOptions): Promise<ModelsUsersV1User>;
    getViewHistory(query?: ViewHistoryQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersMeViewsHistory>;
    getTimecodes(since?: string, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeViewsTimecodes>>;
    upsertTimecodes(data: Array<ViewTimecodeUpsertItem>, options?: RequestOptions): Promise<void>;
    deleteTimecodes(data: Array<ViewTimecodeDeleteItem>, options?: RequestOptions): Promise<void>;
}

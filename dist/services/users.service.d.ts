import type { UsersApi } from '../api/users.api.js';
import type { ModelsUsersV1User, RequestOptions, ResponsesV1AccountsUsersMeViewsHistory, ResponsesV1AccountsUsersMeViewsTimecodes, ViewHistoryQuery, ViewTimecodeDeleteItem, ViewTimecodeUpsertItem } from '../models/types.js';
export declare class UsersService {
    private readonly api;
    constructor(api: UsersApi);
    getProfile(options?: RequestOptions & {
        include?: string | string[];
        exclude?: string | string[];
    }): Promise<ModelsUsersV1User>;
    getViewHistory(query?: ViewHistoryQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersMeViewsHistory>;
    getTimecodes(since?: Date | string, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeViewsTimecodes>>;
    upsertTimecodes(items: Array<ViewTimecodeUpsertItem>, options?: RequestOptions): Promise<void>;
    deleteTimecodes(items: Array<ViewTimecodeDeleteItem>, options?: RequestOptions): Promise<void>;
}

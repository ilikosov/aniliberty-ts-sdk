import type { UsersApi } from '../api/users.api.js';
import type {
  ModelsUsersV1User,
  RequestOptions,
  ResponsesV1AccountsUsersMeViewsHistory,
  ResponsesV1AccountsUsersMeViewsTimecodes,
  ViewHistoryQuery,
  ViewTimecodeDeleteItem,
  ViewTimecodeUpsertItem,
} from '../models/types.js';

export class UsersService {
  public constructor(private readonly api: UsersApi) {}

  public getProfile(options?: RequestOptions & { include?: string | string[]; exclude?: string | string[] }): Promise<ModelsUsersV1User> {
    return this.api.getProfile(options, options);
  }

  public getViewHistory(query?: ViewHistoryQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersMeViewsHistory> {
    return this.api.getViewHistory(query, options);
  }

  public getTimecodes(since?: Date | string, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeViewsTimecodes>> {
    const normalized = since instanceof Date ? since.toISOString() : since;
    return this.api.getTimecodes(normalized, options);
  }

  public upsertTimecodes(items: Array<ViewTimecodeUpsertItem>, options?: RequestOptions): Promise<void> {
    return this.api.upsertTimecodes(items, options);
  }

  public deleteTimecodes(items: Array<ViewTimecodeDeleteItem>, options?: RequestOptions): Promise<void> {
    return this.api.deleteTimecodes(items, options);
  }
}

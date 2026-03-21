import type { HttpClient, QueryParams } from '../core/http-client.js';
import type {
  ModelsUsersV1User,
  RequestOptions,
  ResponsesV1AccountsUsersMeViewsHistory,
  ResponsesV1AccountsUsersMeViewsTimecodes,
  UserProfileQuery,
  ViewHistoryQuery,
  ViewTimecodeDeleteItem,
  ViewTimecodeUpsertItem,
} from '../models/types.js';

export class UsersApi {
  public constructor(private readonly client: HttpClient) {}

  public getProfile(query?: UserProfileQuery, options?: RequestOptions): Promise<ModelsUsersV1User> {
    return this.client.request({ method: 'GET', path: '/accounts/users/me/profile', ...(query ? { query: query as QueryParams } : {}), ...options });
  }

  public getViewHistory(query?: ViewHistoryQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersMeViewsHistory> {
    return this.client.request({ method: 'GET', path: '/accounts/users/me/views/history', ...(query ? { query: query as QueryParams } : {}), ...options });
  }

  public getTimecodes(since?: string, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeViewsTimecodes>> {
    return this.client.request({ method: 'GET', path: '/accounts/users/me/views/timecodes', ...(since ? { query: { since } } : {}), ...options });
  }

  public upsertTimecodes(data: Array<ViewTimecodeUpsertItem>, options?: RequestOptions): Promise<void> {
    return this.client.request({ method: 'POST', path: '/accounts/users/me/views/timecodes', body: data, ...options });
  }

  public deleteTimecodes(data: Array<ViewTimecodeDeleteItem>, options?: RequestOptions): Promise<void> {
    return this.client.request({ method: 'DELETE', path: '/accounts/users/me/views/timecodes', body: data, ...options });
  }
}

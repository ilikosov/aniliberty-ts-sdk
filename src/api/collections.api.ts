import type { HttpClient, QueryParams } from '../core/http-client.js';
import type {
  CollectionDeleteItem,
  CollectionMutationItem,
  CollectionsReleasesQuery,
  CollectionsReleasesRequest,
  RequestOptions,
  ResponsesApiV1AccountsUsersMeCollectionsIds,
  ResponsesApiV1AccountsUsersMeCollectionsReferencesAgeRatings,
  ResponsesApiV1AccountsUsersMeCollectionsReferencesGenres,
  ResponsesApiV1AccountsUsersMeCollectionsReferencesTypes,
  ResponsesApiV1AccountsUsersMeCollectionsReferencesYears,
  ResponsesV1AccountsUsersCollectionsReleases,
  ResponsesV1AccountsUsersMeCollectionsDelete,
  ResponsesV1AccountsUsersMeCollectionsUpdate,
} from '../models/types.js';

export class CollectionsApi {
  public constructor(private readonly client: HttpClient) {}
  public getReferenceAgeRatings(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesAgeRatings> { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/age-ratings', ...options }); }
  public getReferenceGenres(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesGenres> { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/genres', ...options }); }
  public getReferenceTypes(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesTypes> { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/types', ...options }); }
  public getReferenceYears(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesYears> { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/years', ...options }); }
  public getCollectionIds(options?: RequestOptions): Promise<Array<ResponsesApiV1AccountsUsersMeCollectionsIds>> { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/ids', ...options }); }
  public getReleases(query: CollectionsReleasesQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases> { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/releases', query: query as unknown as QueryParams, ...options }); }
  public searchReleases(data: CollectionsReleasesRequest, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases> { return this.client.request({ method: 'POST', path: '/accounts/users/me/collections/releases', body: data, ...options }); }
  public addToCollections(data: Array<CollectionMutationItem>, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeCollectionsUpdate>> { return this.client.request({ method: 'POST', path: '/accounts/users/me/collections', body: data, ...options }); }
  public removeFromCollections(data: Array<CollectionDeleteItem>, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeCollectionsDelete>> { return this.client.request({ method: 'DELETE', path: '/accounts/users/me/collections', body: data, ...options }); }
}

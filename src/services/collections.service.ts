import { paginate } from '../core/pagination.js';
import type { CollectionsApi } from '../api/collections.api.js';
import type {
  CollectionDeleteItem,
  CollectionMutationItem,
  CollectionsReleasesQuery,
  CollectionsReleasesRequest,
  RequestOptions,
  ResponsesV1AccountsUsersCollectionsReleases,
} from '../models/types.js';

export class CollectionsService {
  public constructor(private readonly api: CollectionsApi) {}

  public getReferenceAgeRatings(options?: RequestOptions) {
    return this.api.getReferenceAgeRatings(options);
  }

  public getReferenceGenres(options?: RequestOptions) {
    return this.api.getReferenceGenres(options);
  }

  public getReferenceTypes(options?: RequestOptions) {
    return this.api.getReferenceTypes(options);
  }

  public getReferenceYears(options?: RequestOptions) {
    return this.api.getReferenceYears(options);
  }

  public getIds(options?: RequestOptions) {
    return this.api.getCollectionIds(options);
  }

  public listReleases(query: CollectionsReleasesQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases> {
    return this.api.getReleases(query, options);
  }

  public searchReleases(payload: CollectionsReleasesRequest, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases> {
    return this.api.searchReleases(payload, options);
  }

  public add(items: Array<CollectionMutationItem>, options?: RequestOptions) {
    return this.api.addToCollections(items, options);
  }

  public remove(items: Array<CollectionDeleteItem>, options?: RequestOptions) {
    return this.api.removeFromCollections(items, options);
  }

  public iterateReleases(
    baseQuery: CollectionsReleasesQuery,
    options?: RequestOptions,
  ): AsyncGenerator<unknown, void, unknown> {
    return paginate(async (page) => this.api.getReleases({ ...baseQuery, page }, options));
  }
}

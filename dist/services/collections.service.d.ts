import type { CollectionsApi } from '../api/collections.api.js';
import type { CollectionDeleteItem, CollectionMutationItem, CollectionsReleasesQuery, CollectionsReleasesRequest, RequestOptions, ResponsesV1AccountsUsersCollectionsReleases } from '../models/types.js';
export declare class CollectionsService {
    private readonly api;
    constructor(api: CollectionsApi);
    getReferenceAgeRatings(options?: RequestOptions): Promise<import("../index.js").ResponsesApiV1AccountsUsersMeCollectionsReferencesAgeRatings>;
    getReferenceGenres(options?: RequestOptions): Promise<import("../index.js").ResponsesApiV1AccountsUsersMeCollectionsReferencesGenres>;
    getReferenceTypes(options?: RequestOptions): Promise<import("../index.js").ResponsesApiV1AccountsUsersMeCollectionsReferencesTypes>;
    getReferenceYears(options?: RequestOptions): Promise<import("../index.js").ResponsesApiV1AccountsUsersMeCollectionsReferencesYears>;
    getIds(options?: RequestOptions): Promise<import("../index.js").ResponsesApiV1AccountsUsersMeCollectionsIds[]>;
    listReleases(query: CollectionsReleasesQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases>;
    searchReleases(payload: CollectionsReleasesRequest, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases>;
    add(items: Array<CollectionMutationItem>, options?: RequestOptions): Promise<import("../index.js").ResponsesV1AccountsUsersMeCollectionsUpdate[]>;
    remove(items: Array<CollectionDeleteItem>, options?: RequestOptions): Promise<import("../index.js").ResponsesV1AccountsUsersMeCollectionsDelete[]>;
    iterateReleases(baseQuery: CollectionsReleasesQuery, options?: RequestOptions): AsyncGenerator<unknown, void, unknown>;
}

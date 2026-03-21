import type { HttpClient } from '../core/http-client.js';
import type { CollectionDeleteItem, CollectionMutationItem, CollectionsReleasesQuery, CollectionsReleasesRequest, RequestOptions, ResponsesApiV1AccountsUsersMeCollectionsIds, ResponsesApiV1AccountsUsersMeCollectionsReferencesAgeRatings, ResponsesApiV1AccountsUsersMeCollectionsReferencesGenres, ResponsesApiV1AccountsUsersMeCollectionsReferencesTypes, ResponsesApiV1AccountsUsersMeCollectionsReferencesYears, ResponsesV1AccountsUsersCollectionsReleases, ResponsesV1AccountsUsersMeCollectionsDelete, ResponsesV1AccountsUsersMeCollectionsUpdate } from '../models/types.js';
export declare class CollectionsApi {
    private readonly client;
    constructor(client: HttpClient);
    getReferenceAgeRatings(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesAgeRatings>;
    getReferenceGenres(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesGenres>;
    getReferenceTypes(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesTypes>;
    getReferenceYears(options?: RequestOptions): Promise<ResponsesApiV1AccountsUsersMeCollectionsReferencesYears>;
    getCollectionIds(options?: RequestOptions): Promise<Array<ResponsesApiV1AccountsUsersMeCollectionsIds>>;
    getReleases(query: CollectionsReleasesQuery, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases>;
    searchReleases(data: CollectionsReleasesRequest, options?: RequestOptions): Promise<ResponsesV1AccountsUsersCollectionsReleases>;
    addToCollections(data: Array<CollectionMutationItem>, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeCollectionsUpdate>>;
    removeFromCollections(data: Array<CollectionDeleteItem>, options?: RequestOptions): Promise<Array<ResponsesV1AccountsUsersMeCollectionsDelete>>;
}

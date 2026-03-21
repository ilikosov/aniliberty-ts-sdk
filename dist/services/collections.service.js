import { paginate } from '../core/pagination.js';
export class CollectionsService {
    api;
    constructor(api) {
        this.api = api;
    }
    getReferenceAgeRatings(options) {
        return this.api.getReferenceAgeRatings(options);
    }
    getReferenceGenres(options) {
        return this.api.getReferenceGenres(options);
    }
    getReferenceTypes(options) {
        return this.api.getReferenceTypes(options);
    }
    getReferenceYears(options) {
        return this.api.getReferenceYears(options);
    }
    getIds(options) {
        return this.api.getCollectionIds(options);
    }
    listReleases(query, options) {
        return this.api.getReleases(query, options);
    }
    searchReleases(payload, options) {
        return this.api.searchReleases(payload, options);
    }
    add(items, options) {
        return this.api.addToCollections(items, options);
    }
    remove(items, options) {
        return this.api.removeFromCollections(items, options);
    }
    iterateReleases(baseQuery, options) {
        return paginate(async (page) => this.api.getReleases({ ...baseQuery, page }, options));
    }
}

export class CollectionsApi {
    client;
    constructor(client) {
        this.client = client;
    }
    getReferenceAgeRatings(options) { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/age-ratings', ...options }); }
    getReferenceGenres(options) { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/genres', ...options }); }
    getReferenceTypes(options) { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/types', ...options }); }
    getReferenceYears(options) { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/references/years', ...options }); }
    getCollectionIds(options) { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/ids', ...options }); }
    getReleases(query, options) { return this.client.request({ method: 'GET', path: '/accounts/users/me/collections/releases', query: query, ...options }); }
    searchReleases(data, options) { return this.client.request({ method: 'POST', path: '/accounts/users/me/collections/releases', body: data, ...options }); }
    addToCollections(data, options) { return this.client.request({ method: 'POST', path: '/accounts/users/me/collections', body: data, ...options }); }
    removeFromCollections(data, options) { return this.client.request({ method: 'DELETE', path: '/accounts/users/me/collections', body: data, ...options }); }
}

export class UsersService {
    api;
    constructor(api) {
        this.api = api;
    }
    getProfile(options) {
        return this.api.getProfile(options, options);
    }
    getViewHistory(query, options) {
        return this.api.getViewHistory(query, options);
    }
    getTimecodes(since, options) {
        const normalized = since instanceof Date ? since.toISOString() : since;
        return this.api.getTimecodes(normalized, options);
    }
    upsertTimecodes(items, options) {
        return this.api.upsertTimecodes(items, options);
    }
    deleteTimecodes(items, options) {
        return this.api.deleteTimecodes(items, options);
    }
}

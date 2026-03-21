export class UsersApi {
    client;
    constructor(client) {
        this.client = client;
    }
    getProfile(query, options) {
        return this.client.request({ method: 'GET', path: '/accounts/users/me/profile', ...(query ? { query: query } : {}), ...options });
    }
    getViewHistory(query, options) {
        return this.client.request({ method: 'GET', path: '/accounts/users/me/views/history', ...(query ? { query: query } : {}), ...options });
    }
    getTimecodes(since, options) {
        return this.client.request({ method: 'GET', path: '/accounts/users/me/views/timecodes', ...(since ? { query: { since } } : {}), ...options });
    }
    upsertTimecodes(data, options) {
        return this.client.request({ method: 'POST', path: '/accounts/users/me/views/timecodes', body: data, ...options });
    }
    deleteTimecodes(data, options) {
        return this.client.request({ method: 'DELETE', path: '/accounts/users/me/views/timecodes', body: data, ...options });
    }
}

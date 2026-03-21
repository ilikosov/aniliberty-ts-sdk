import { APIError } from './errors.js';
const DEFAULT_RETRYABLE_STATUSES = [408, 425, 429, 500, 502, 503, 504];
export class HttpClient {
    baseURL;
    fetcher;
    defaultHeaders;
    onRequest;
    onResponse;
    retryDelayMs;
    retryOnStatuses;
    token;
    constructor(config = {}) {
        this.baseURL = config.baseURL ?? 'https://aniliberty.top/api/v1';
        this.fetcher = config.fetch ?? fetch;
        this.defaultHeaders = config.headers ?? {};
        this.onRequest = config.onRequest;
        this.onResponse = config.onResponse;
        this.retryDelayMs = config.retryDelayMs ?? 300;
        this.retryOnStatuses = config.retryOnStatuses ?? DEFAULT_RETRYABLE_STATUSES;
        this.token = config.token;
    }
    setToken(token) {
        this.token = token;
    }
    clearToken() {
        this.token = undefined;
    }
    getToken() {
        return this.token;
    }
    buildQueryString(query) {
        if (!query)
            return '';
        const params = new URLSearchParams();
        for (const [key, rawValue] of Object.entries(query)) {
            if (rawValue === undefined || rawValue === null)
                continue;
            if (Array.isArray(rawValue)) {
                for (const item of rawValue) {
                    params.append(key, String(item));
                }
                continue;
            }
            params.append(key, String(rawValue));
        }
        const queryString = params.toString();
        return queryString ? `?${queryString}` : '';
    }
    async request(options) {
        const retries = options.retries ?? 0;
        for (let attempt = 0;; attempt += 1) {
            try {
                return await this.executeRequest(options);
            }
            catch (error) {
                const shouldRetry = attempt < retries && this.isRetryable(error);
                if (!shouldRetry) {
                    throw error;
                }
                await this.delay(this.retryDelayMs * (attempt + 1));
            }
        }
    }
    async executeRequest(options) {
        const headers = new Headers(this.defaultHeaders);
        headers.set('Accept', 'application/json');
        if (options.body !== undefined) {
            headers.set('Content-Type', 'application/json');
        }
        if (options.headers) {
            for (const [key, value] of Object.entries(options.headers)) {
                headers.set(key, value);
            }
        }
        if (this.token) {
            headers.set('Authorization', `Bearer ${this.token}`);
        }
        const url = `${this.baseURL}${options.path}${this.buildQueryString(options.query)}`;
        const requestContext = {
            url,
            method: options.method,
            headers,
            ...(options.query ? { query: options.query } : {}),
            ...(options.body !== undefined ? { body: options.body } : {}),
            options,
        };
        await this.onRequest?.(requestContext);
        const init = {
            method: options.method,
            headers,
            ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
            ...(options.signal ? { signal: options.signal } : {}),
        };
        const response = await this.fetcher(url, init);
        const data = (await this.parseResponse(response));
        if (!response.ok) {
            throw new APIError(this.getErrorMessage(response.status, data), response.status, data, response.headers);
        }
        const responseContext = { request: requestContext, response, data };
        await this.onResponse?.(responseContext);
        return data;
    }
    async parseResponse(response) {
        if (response.status === 204)
            return undefined;
        const contentType = response.headers.get('content-type') ?? '';
        if (contentType.includes('application/json'))
            return response.json();
        const text = await response.text();
        if (!text)
            return undefined;
        try {
            return JSON.parse(text);
        }
        catch {
            return text;
        }
    }
    getErrorMessage(status, body) {
        if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
            return body.message;
        }
        return `API request failed with status ${status}`;
    }
    isRetryable(error) {
        return error instanceof APIError ? this.retryOnStatuses.includes(error.status) : error instanceof TypeError;
    }
    async delay(ms) {
        await new Promise((resolve) => setTimeout(resolve, ms));
    }
}

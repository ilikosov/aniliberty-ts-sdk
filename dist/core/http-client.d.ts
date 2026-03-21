import type { RequestOptions } from '../models/types.js';
import type { SDKConfig } from './config.js';
export type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;
export type QueryParams = Record<string, QueryValue>;
export interface HttpRequestOptions extends RequestOptions {
    method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
    path: string;
    query?: QueryParams | undefined;
    body?: unknown;
}
export declare class HttpClient {
    private readonly baseURL;
    private readonly fetcher;
    private readonly defaultHeaders;
    private readonly onRequest?;
    private readonly onResponse?;
    private readonly retryDelayMs;
    private readonly retryOnStatuses;
    private token;
    constructor(config?: SDKConfig);
    setToken(token: string): void;
    clearToken(): void;
    getToken(): string | undefined;
    buildQueryString(query?: QueryParams | undefined): string;
    request<TResponse>(options: HttpRequestOptions): Promise<TResponse>;
    private executeRequest;
    private parseResponse;
    private getErrorMessage;
    private isRetryable;
    private delay;
}

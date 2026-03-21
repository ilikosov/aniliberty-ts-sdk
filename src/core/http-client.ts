import { APIError } from './errors.js';
import type { RequestOptions } from '../models/types.js';
import type { RequestContext, ResponseContext, SDKConfig } from './config.js';

export type QueryValue = string | number | boolean | null | undefined | Array<string | number | boolean>;
export type QueryParams = Record<string, QueryValue>;

export interface HttpRequestOptions extends RequestOptions {
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  path: string;
  query?: QueryParams | undefined;
  body?: unknown;
}

const DEFAULT_RETRYABLE_STATUSES = [408, 425, 429, 500, 502, 503, 504];

export class HttpClient {
  private readonly baseURL: string;
  private readonly fetcher: typeof fetch;
  private readonly defaultHeaders: Record<string, string>;
  private readonly onRequest?: SDKConfig['onRequest'];
  private readonly onResponse?: SDKConfig['onResponse'];
  private readonly retryDelayMs: number;
  private readonly retryOnStatuses: number[];
  private token: string | undefined;

  public constructor(config: SDKConfig = {}) {
    this.baseURL = config.baseURL ?? 'https://aniliberty.top/api/v1';
    this.fetcher = config.fetch ?? fetch;
    this.defaultHeaders = config.headers ?? {};
    this.onRequest = config.onRequest;
    this.onResponse = config.onResponse;
    this.retryDelayMs = config.retryDelayMs ?? 300;
    this.retryOnStatuses = config.retryOnStatuses ?? DEFAULT_RETRYABLE_STATUSES;
    this.token = config.token;
  }

  public setToken(token: string): void {
    this.token = token;
  }

  public clearToken(): void {
    this.token = undefined;
  }

  public getToken(): string | undefined {
    return this.token;
  }

  public buildQueryString(query?: QueryParams | undefined): string {
    if (!query) return '';

    const params = new URLSearchParams();
    for (const [key, rawValue] of Object.entries(query)) {
      if (rawValue === undefined || rawValue === null) continue;
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

  public async request<TResponse>(options: HttpRequestOptions): Promise<TResponse> {
    const retries = options.retries ?? 0;

    for (let attempt = 0; ; attempt += 1) {
      try {
        return await this.executeRequest<TResponse>(options);
      } catch (error) {
        const shouldRetry = attempt < retries && this.isRetryable(error);
        if (!shouldRetry) {
          throw error;
        }
        await this.delay(this.retryDelayMs * (attempt + 1));
      }
    }
  }

  private async executeRequest<TResponse>(options: HttpRequestOptions): Promise<TResponse> {
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
    const requestContext: RequestContext = {
      url,
      method: options.method,
      headers,
      ...(options.query ? { query: options.query } : {}),
      ...(options.body !== undefined ? { body: options.body } : {}),
      options,
    };

    await this.onRequest?.(requestContext);

    const init: RequestInit = {
      method: options.method,
      headers,
      ...(options.body !== undefined ? { body: JSON.stringify(options.body) } : {}),
      ...(options.signal ? { signal: options.signal } : {}),
    };

    const response = await this.fetcher(url, init);
    const data = (await this.parseResponse(response)) as TResponse;

    if (!response.ok) {
      throw new APIError(this.getErrorMessage(response.status, data), response.status, data, response.headers);
    }

    const responseContext: ResponseContext<TResponse> = { request: requestContext, response, data };
    await this.onResponse?.(responseContext);
    return data;
  }

  private async parseResponse(response: Response): Promise<unknown> {
    if (response.status === 204) return undefined;
    const contentType = response.headers.get('content-type') ?? '';
    if (contentType.includes('application/json')) return response.json();
    const text = await response.text();
    if (!text) return undefined;
    try {
      return JSON.parse(text) as unknown;
    } catch {
      return text;
    }
  }

  private getErrorMessage(status: number, body: unknown): string {
    if (body && typeof body === 'object' && 'message' in body && typeof body.message === 'string') {
      return body.message;
    }
    return `API request failed with status ${status}`;
  }

  private isRetryable(error: unknown): boolean {
    return error instanceof APIError ? this.retryOnStatuses.includes(error.status) : error instanceof TypeError;
  }

  private async delay(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
  }
}

import type { RequestOptions } from '../models/types.js';

export interface RequestContext {
  url: string;
  method: string;
  headers: Headers;
  query?: Record<string, unknown> | undefined;
  body?: unknown;
  options?: RequestOptions;
}

export interface ResponseContext<TData = unknown> {
  request: RequestContext;
  response: Response;
  data: TData;
}

export interface HttpClientHooks {
  onRequest?: (context: RequestContext) => Promise<void> | void;
  onResponse?: <TData>(context: ResponseContext<TData>) => Promise<void> | void;
}

export interface RetryConfig {
  retries?: number;
  retryDelayMs?: number;
  retryOnStatuses?: number[];
}

export interface SDKConfig extends HttpClientHooks, RetryConfig {
  baseURL?: string;
  token?: string;
  fetch?: typeof fetch;
  headers?: Record<string, string>;
}

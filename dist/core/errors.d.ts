export declare class APIError<TBody = unknown> extends Error {
    readonly status: number;
    readonly body: TBody | undefined;
    readonly headers: Headers;
    constructor(message: string, status: number, body?: TBody, headers?: Headers);
}

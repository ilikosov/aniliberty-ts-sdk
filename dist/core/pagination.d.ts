export interface PaginatedEnvelope<T> {
    data?: T;
    meta?: unknown;
}
export declare function paginate<TItem, TPage extends PaginatedEnvelope<TItem[]>>(fetchPage: (page: number) => Promise<TPage>): AsyncGenerator<TItem, void, unknown>;

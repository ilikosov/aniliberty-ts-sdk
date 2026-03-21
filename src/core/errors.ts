export class APIError<TBody = unknown> extends Error {
  public readonly status: number;
  public readonly body: TBody | undefined;
  public readonly headers: Headers;

  public constructor(message: string, status: number, body?: TBody, headers: Headers = new Headers()) {
    super(message);
    this.name = 'APIError';
    this.status = status;
    this.body = body;
    this.headers = headers;
  }
}

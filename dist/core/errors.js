export class APIError extends Error {
    status;
    body;
    headers;
    constructor(message, status, body, headers = new Headers()) {
        super(message);
        this.name = 'APIError';
        this.status = status;
        this.body = body;
        this.headers = headers;
    }
}

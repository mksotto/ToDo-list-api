export class NotFoundError extends Error {
    code: number = 404;

    constructor(message: string = 'NotFound') {
        super(message);
    };
}

export const isNotFoundError = (e: unknown): e is NotFoundError => (e as NotFoundError).code === 404;
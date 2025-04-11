export class NotFoundError extends Error {
    type = 'NotFoundError';

    constructor(message: string = 'NotFound') {
        super(message);
    }
}

export const isNotFoundError = (e: any): e is NotFoundError => (e as NotFoundError).type === 'NotFoundError';
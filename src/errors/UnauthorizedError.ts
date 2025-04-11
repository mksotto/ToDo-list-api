export class UnauthorizedError extends Error {
    type = 'UnauthorizedError';

    constructor(message: string = 'Unauthorized') {
        super(message);
    }
}

export const isUnauthorizedError = (e: any): e is UnauthorizedError => (e as UnauthorizedError).type === 'UnauthorizedError';
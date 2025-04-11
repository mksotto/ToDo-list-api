export class ForbiddenError extends Error {
    type= 'ForbiddenError';

    constructor(message: string = 'Forbidden') {
        super(message);
    }
}

export const isForbiddenError = (e: any): e is ForbiddenError => (e as ForbiddenError).type === 'ForbiddenError';
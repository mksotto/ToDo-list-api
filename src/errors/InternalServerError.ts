export class InternalServerError extends Error {
    type = 'InternalServerError';

    constructor(message: string = 'InternalServerError') {
        super(message);
    }
}

export const isInternalServerError = (e: any): e is InternalServerError => (e as InternalServerError).type === 'InternalServerError';
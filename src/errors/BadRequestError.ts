export class BadRequestError extends Error {
    type = 'BadRequestError';

    constructor(message: string = 'BadRequest') {
        super(message);
    }
}

export const isBadRequestError = (e: any): e is BadRequestError => (e as BadRequestError).type === 'BadRequestError';
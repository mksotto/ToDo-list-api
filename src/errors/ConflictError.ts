export class ConflictError extends Error {
    type = 'ConflictError';

    constructor(message: string = 'Conflict!') {
        super(message);
    }
}

export const isConflictError = (e: any): e is ConflictError => (e as ConflictError).type === 'ConflictError';
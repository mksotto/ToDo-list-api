import {TNotFoundError} from "../types/domain/todo-list-api";

export class NotFoundError extends Error {
    code: number = 404;

    constructor(message: TNotFoundError = 'NotFound') {
        super(message);
    };
}

export const isNotFoundError = (e: unknown): e is NotFoundError => (e as NotFoundError).code === 404;
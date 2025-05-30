import {TInternalServerError} from "../types/domain/todo-list-api";

export class InternalServerError extends Error {
    code: number = 500;

    constructor(message: TInternalServerError = 'InternalServerError') {
        super(message);
    };
}

export const isInternalServerError = (e: unknown): e is InternalServerError => (e as InternalServerError).code === 500;
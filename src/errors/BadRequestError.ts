import {TBadRequestError} from "../types/domain/todo-list-api";

export class BadRequestError extends Error {
    code: number = 400;

    constructor(message: TBadRequestError = 'BadRequest') {
        super(message);
    };
}

export const isBadRequestError = (e: unknown): e is BadRequestError => (e as BadRequestError).code === 400;
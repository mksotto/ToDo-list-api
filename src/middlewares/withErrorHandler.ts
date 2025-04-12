import {
    FastifyReply,
    RequestGenericInterface,
} from "fastify";
import {isBadRequestError} from "../errors/BadRequestError";
import {isUnauthorizedError} from "../errors/UnauthorizedError";
import {isForbiddenError} from "../errors/ForbiddenError";
import {isNotFoundError} from "../errors/NotFoundError";
import {isConflictError} from "../errors/ConflictError";
import {isInternalServerError} from "../errors/InternalServerError";
import {CustomRouteHandlerMethod} from "../types/CustomRouteHandlerMethod";

export const handleErrors = (e: unknown, resp: FastifyReply) => {
    if (isBadRequestError(e)) {
        return resp.code(e.code).send(e.message); // 400
    }
    if (isUnauthorizedError(e)) {
        return resp.code(e.code).send(e.message); // 401
    }
    if (isForbiddenError(e)) {
        return resp.code(e.code).send(e.message); // 403
    }
    if (isNotFoundError(e)) {
        return resp.code(e.code).send(e.message); // 404
    }
    if (isConflictError(e)) {
        return resp.code(e.code).send(e.message); // 409
    }
    if (isInternalServerError(e)) {
        return resp.code(e.code).send(e.message); // 500
    }
    console.error(e);
    return resp.code(500).send('InternalServerError');
};

export const withErrorHandler = <T extends RequestGenericInterface>(
    fn: CustomRouteHandlerMethod<T>
): CustomRouteHandlerMethod<T> =>
    async function (req, resp) {
        try {
            await fn.call(this, req, resp);
        } catch (e) {
            handleErrors(e, resp);
        }
    } as CustomRouteHandlerMethod<T>;
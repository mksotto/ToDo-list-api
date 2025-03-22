import {
    RouteHandlerMethod,
    FastifyReply,
    RequestGenericInterface,
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression
} from "fastify";
import {isBadRequestError} from "../errors/BadRequestError";
import {isUnauthorizedError} from "../errors/UnauthorizedError";
import {isForbiddenError} from "../errors/ForbiddenError";
import {isNotFoundError} from "../errors/NotFoundError";
import {isConflictError} from "../errors/ConflictError";
import {isInternalServerError} from "../errors/InternalServerError";

type RouteHandlerMethodWithReq<T extends RequestGenericInterface> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    T
>

export const handleErrors = (e: unknown, resp: FastifyReply) => {
    if (isBadRequestError(e)) {
        return resp.code(400).send(e.message)
    }
    if (isUnauthorizedError(e)) {
        return resp.code(401).send(e.message)
    }
    if (isForbiddenError(e)) {
        return resp.code(403).send(e.message)
    }
    if (isNotFoundError(e)) {
        return resp.code(404).send(e.message)
    }
    if (isConflictError(e)) {
        return resp.code(409).send(e.message)
    }
    if (isInternalServerError(e)) {
        return resp.code(500).send(e.message)
    }
    console.error(e)
    return resp.code(500).send('Internal Server Error')
};

export const withErrorHandler = <T extends RequestGenericInterface>(fn: RouteHandlerMethodWithReq<T>): RouteHandlerMethodWithReq<T> => {
    return async function (req, resp) {
        try {
            await fn.call(this, req, resp);
        } catch (e) {
            handleErrors(e, resp);
        }
    } as RouteHandlerMethodWithReq<T>;
};
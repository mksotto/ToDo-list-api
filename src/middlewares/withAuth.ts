import {RequestGenericInterface} from "fastify";
import {RouteHandlerMethodWithReq} from "../types/RouteHandlerMethodWithReq";
import jwt from 'jsonwebtoken';
import {UnauthorizedError} from "../errors/UnauthorizedError";

export const withAuth = <T extends RequestGenericInterface>(fn: RouteHandlerMethodWithReq<T>): RouteHandlerMethodWithReq<T> => {
    return async function (req, resp) {
        const userToken = req.cookies.sessionId;
        if (!userToken) {
            throw new UnauthorizedError();
        }
        jwt.verify(userToken, process.env.SECRET_KEY!, async (e, _decoded) => {
            if (e) {
                throw new UnauthorizedError();
            }
            await fn.call(this, req, resp);
        });
    } as RouteHandlerMethodWithReq<T>;
}
import {
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RequestGenericInterface,
    RouteHandlerMethod
} from "fastify";

export type RouteHandlerMethodWithReq<T extends RequestGenericInterface> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    T
>
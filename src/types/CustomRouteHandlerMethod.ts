import {
    RawReplyDefaultExpression,
    RawRequestDefaultExpression,
    RawServerDefault,
    RequestGenericInterface,
    RouteHandlerMethod
} from "fastify";

export type CustomRouteHandlerMethod<T extends RequestGenericInterface> = RouteHandlerMethod<
    RawServerDefault,
    RawRequestDefaultExpression,
    RawReplyDefaultExpression,
    T
>
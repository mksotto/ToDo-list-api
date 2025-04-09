import {RequestGenericInterface} from "fastify";
import {CustomRouteHandlerMethod} from "../types/CustomRouteHandlerMethod";
import jwt from 'jsonwebtoken';
import {UnauthorizedError} from "../errors/UnauthorizedError";
import {AddParameters} from "../types/AddParameters";
import {users} from '@prisma/client'
import {db} from "../db";

type JWTPayload = {
    userId: string;
    iat: number;
    exp: number;
}

export const withAuth = <T extends RequestGenericInterface>(
    fn: AddParameters<CustomRouteHandlerMethod<T>, [user: users]>
): CustomRouteHandlerMethod<T> =>
    async function (req, resp) {
        const userToken = req.cookies.sessionId;
        if (!userToken) {
            throw new UnauthorizedError();
        }
        let user;
        try {
            const {userId} = jwt.verify(userToken, process.env.SECRET_KEY!) as JWTPayload;
            user = await db.users.findFirstOrThrow({where: {id: userId}});
        } catch {
            throw new UnauthorizedError();
        }
        await fn.call(this, req, resp, user);
    } as CustomRouteHandlerMethod<T>;
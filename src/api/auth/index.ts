import {FastifyInstance, FastifyPluginCallback} from "fastify";
import {authSignupPost} from "./authSignupPost";
import {authLoginPost} from "./authLoginPost";
import {authGet} from "./authGet";
import {authDelete} from "./authDelete";
import {authPatch} from "./authPatch";

export const authHandler: FastifyPluginCallback = (
    fastify: FastifyInstance,
    _,
    done,
) => {
    // GET /auth
    authGet(fastify);

    // PATCH /auth
    authPatch(fastify);

    // DELETE /auth
    authDelete(fastify);

    // POST /auth/signup
    authSignupPost(fastify);

    // GET /auth/login
    authLoginPost(fastify);

    done();
}
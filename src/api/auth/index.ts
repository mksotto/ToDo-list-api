import {FastifyInstance, FastifyPluginCallback} from "fastify";
import {authSignupPost} from "./authSignupPost";
import {authLoginPost} from "./authLoginPost";
import {authGet} from "./authGet";
import {authDelete} from "./authDelete";

export const authHandler: FastifyPluginCallback = (
    fastify: FastifyInstance,
    _,
    done,
) => {
    // GET /auth
    authGet(fastify);

    // DELETE /auth
    authDelete(fastify);

    // POST /auth/signup
    authSignupPost(fastify);

    // GET /auth/login
    authLoginPost(fastify);

    done();
}
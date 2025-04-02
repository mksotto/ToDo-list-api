import {FastifyInstance, FastifyPluginCallback} from "fastify";
import {authSignupPost} from "./authSignupPost";
import {authLoginPost} from "./authLoginPost";

export const authHandler: FastifyPluginCallback = (
    fastify: FastifyInstance,
    _,
    done,
) => {
    // POST /auth/signup
    authSignupPost(fastify);

    // GET /auth/login
    authLoginPost(fastify);

    done();
}
import {FastifyPluginCallback} from "fastify";
import {usersExistsPost} from "./usersExistsPost";

export const usersHandler: FastifyPluginCallback = (
    fastify,
    _,
    done
) => {
    // POST /users/exists
    usersExistsPost(fastify);

    done();
};
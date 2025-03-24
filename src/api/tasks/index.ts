import {FastifyInstance, FastifyPluginCallback} from "fastify";
import {tasksPost} from "./tasksPost";

export const tasksHandler: FastifyPluginCallback = (
    fastify: FastifyInstance,
    _,
    done,
) => {
    // POST /tasks
    tasksPost(fastify);

    done();
}
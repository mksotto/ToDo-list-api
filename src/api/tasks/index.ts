import {FastifyInstance, FastifyPluginCallback} from "fastify";
import {tasksGet} from "./tasksGet";
import {tasksPost} from "./tasksPost";
import {tasksIdPatch} from "./tasksIdPatch";
import {tasksIdDelete} from "./tasksIdDelete";

export const tasksHandler: FastifyPluginCallback = (
    fastify: FastifyInstance,
    _,
    done,
) => {
    // GET /tasks
    tasksGet(fastify);

    // POST /tasks
    tasksPost(fastify);

    // PATCH /tasks/{id}
    tasksIdPatch(fastify);

    // DELETE /tasks/{id}
    tasksIdDelete(fastify);

    done();
}
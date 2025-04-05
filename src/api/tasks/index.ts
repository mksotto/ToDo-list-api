import {FastifyInstance, FastifyPluginCallback} from "fastify";
import {tasksGet} from "./tasksGet";
import {tasksPost} from "./tasksPost";
import {tasksIdPatch} from "./tasksIdPatch";
import {tasksIdDelete} from "./tasksIdDelete";
import {tasksIdCompletedPut} from "./tasksIdCompletedPut";
import {tasksCompletedDelete} from "./tasksCompletedDelete";

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

    // PUT /tasks/{id}/completed
    tasksIdCompletedPut(fastify);

    // DELETE /tasks/completed
    tasksCompletedDelete(fastify);

    done();
}
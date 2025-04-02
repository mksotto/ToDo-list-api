import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {db} from "../../db";
import {makeTask} from "../../dtos/makeTask";

export const tasksGet = (f: FastifyInstance) => {
    f.get('/', withErrorHandler(withAuth(async (
        _req,
        resp,
        user
    ) => {
        const tasks = await db.tasks.findMany({where: {user_id: user.id}});
        resp.code(200).send(tasks.map(makeTask));
    })));
};
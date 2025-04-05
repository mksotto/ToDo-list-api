import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {db} from "../../db";

export const tasksCompletedDelete = (f: FastifyInstance) => {
    f.delete('/completed', withErrorHandler(withAuth(async (req, resp, user) => {
        await db.tasks.deleteMany({where: {user_id: user.id, completed: true}});
        resp.code(200).send();
    })));
};
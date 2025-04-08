import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {db} from "../../db";
import {NotFoundError} from "../../errors/NotFoundError";

export const tasksIdDelete = (f: FastifyInstance) => {
    f.delete<{ Params: {id: string} }>('/:id', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const {id} = req.params;
        const task = await db.tasks.findFirst({where: {id}});
        if (!task) {
            throw new NotFoundError();
        }
        if (task.user_id !== user.id) {
            throw new NotFoundError();
        }
        await db.tasks.delete({where: {id}});
        return resp.code(200).send();
    })))
}
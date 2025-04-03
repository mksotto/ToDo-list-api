import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {TaskCompleted} from "../../types/domain/todo-list-api";
import {db} from "../../db";
import {NotFoundError} from "../../errors/NotFoundError";

type Route = {
    Params: {id: string};
    Body: TaskCompleted;
};

export const tasksIdCompletedPut = (f: FastifyInstance) => {
    f.put<Route>('/:id/completed', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const task = await db.tasks.findFirst({where: {id: req.params.id}});
        if (!task) {
            throw new NotFoundError();
        }
        if (task.user_id !== user.id) {
            throw new NotFoundError();
        }
        await db.tasks.update({
            where: {id: req.params.id},
            data: {completed: req.body.completed}
        });
        return resp.code(200).send();
    })));
};
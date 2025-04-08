import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {db} from "../../db";
import {NotFoundError} from "../../errors/NotFoundError";
import {TaskPatch} from "../../types/domain/todo-list-api";

type Route = {
    Params: {id: string};
    Body: TaskPatch;
}

export const tasksIdPatch = (f: FastifyInstance) => {
    f.patch<Route>('/:id', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const {name, description, deadline} = req.body;
        const task = await db.tasks.findFirst({where: {id: req.params.id}});
        if (!task) {
            throw new NotFoundError();
        }
        if (task.user_id !== user.id) {
            throw new NotFoundError();
        }
        await db.tasks.update({
            where: {id: req.params.id},
            data: {
                name,
                description,
                deadline,
            },
        });
        return resp.code(200).send();
    })));
};
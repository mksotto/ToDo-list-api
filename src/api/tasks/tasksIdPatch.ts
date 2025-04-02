import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {db} from "../../db";
import {ForbiddenError} from "../../errors/ForbiddenError";
import {NotFoundError} from "../../errors/NotFoundError";

type Route = {
    Params: {id: string};
    Body: {name?: string, description?: string, deadline?: Date};
}

export const tasksIdPatch = (f: FastifyInstance) => {
    f.patch<Route>('/:id', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const task = await db.tasks.findFirst({where: {id: req.params.id}})
        if (!task) {
            throw new NotFoundError();
        }
        if (task.user_id !== user.id) {
            throw new ForbiddenError();
        }
        await db.tasks.update({
            where: {id: req.params.id},
            data: {
                name: req.body.name,
                description: req.body.description,
                deadline: req.body.deadline,
            },
        });
        resp.code(200);
    })));
};
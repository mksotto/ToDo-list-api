import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {db} from "../../db";
import {ForbiddenError} from "../../errors/ForbiddenError";

export const tasksIdDelete = (f: FastifyInstance) => {
    f.delete<{ Params: {id: string} }>('/:id', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        if (!await db.tasks.findFirst({where: {id: req.params.id, user_id: user.id}})) {
            throw new ForbiddenError();
        }
        await db.tasks.delete({where: {id: req.params.id}});
        return resp.code(200);
    })))
}
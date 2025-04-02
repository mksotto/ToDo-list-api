import {FastifyInstance} from "fastify";
import {db} from "../../db";
import {v7 as uuid} from 'uuid';
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {BadRequestError} from "../../errors/BadRequestError";

export const tasksPost = (f: FastifyInstance) => {
    f.post<{ Body: {name: string, description?: string, deadline?: Date} }>('/', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const {name, description, deadline} = req.body;
        if (!name) {
            throw new BadRequestError();
        }
        await db.tasks.create({
            data: {
                id: uuid(),
                name,
                description,
                deadline,
                user_id: user.id,
            }
        });
        return resp.code(201);
    })));
};
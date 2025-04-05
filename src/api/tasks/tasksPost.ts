import {FastifyInstance} from "fastify";
import {db} from "../../db";
import {v7 as uuid} from 'uuid';
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {BadRequestError} from "../../errors/BadRequestError";
import {TaskPost} from "../../types/domain/todo-list-api";

export const tasksPost = (f: FastifyInstance) => {
    f.post<{ Body: TaskPost }>('/', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const {name, description, deadline} = req.body;
        if (!name) {
            throw new BadRequestError();
        }
        const taskId = uuid();
        await db.tasks.create({
            data: {
                id: taskId,
                name,
                description,
                deadline,
                user_id: user.id,
            }
        });
        return resp.code(201).send();
    })));
};
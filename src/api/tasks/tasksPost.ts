import {FastifyInstance} from "fastify";
import {db} from "../../db";
import {v7 as uuid} from 'uuid';
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";

export const tasksPost = (f: FastifyInstance) => {
    f.post<{ Body: {name: string, description?: string, deadline?: Date, user_id: string} }>('/', withErrorHandler(withAuth(async (req, resp) => {
        const {name, description, deadline, user_id} = req.body;
        await db.new_tasks.create({
            data: {
                id: uuid(),
                name,
                description,
                deadline,
                user_id,
            }
        })
    })))
}
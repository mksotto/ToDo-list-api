import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {UsersExistsPost, UsersExistsPostResponse} from "../../types/domain/todo-list-api";
import {db} from "../../db";
import {BadRequestError} from "../../errors/BadRequestError";

type Route = {
    Body: UsersExistsPost;
    Reply: UsersExistsPostResponse;
}

export const usersExistsPost = (f: FastifyInstance) => {
    f.post<Route>('/exists', withErrorHandler(async (req, resp) => {
        const {username} = req.body;
        if (!username) {
            throw new BadRequestError('Missing property username!');
        }
        const user = await db.users.findFirst({where: {username}});
        return resp.code(200).send(user ? {username, exists: true} : {username, exists: false});
    }));
};
import {FastifyInstance} from "fastify";
import {withAuth} from "../../middlewares/withAuth";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {makeUser} from "../../dtos/makeUser";

export const authGet = (f: FastifyInstance) => {
    f.get('/', withErrorHandler(withAuth(async (req, resp, user) => {
        return resp.code(200).send(makeUser(user));
    })));
};
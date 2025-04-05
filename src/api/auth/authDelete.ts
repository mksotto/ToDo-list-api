import {FastifyInstance} from "fastify";
import {withAuth} from "../../middlewares/withAuth";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {COOKIE_NAME} from "../../constants/constants";

export const authDelete = (f: FastifyInstance) => {
    f.delete('/', withErrorHandler(withAuth(async (req, resp) => {
        return resp.code(200).clearCookie(COOKIE_NAME).send();
    })));
};
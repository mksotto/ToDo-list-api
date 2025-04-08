import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {AuthPatch} from "../../types/domain/todo-list-api";
import {db} from "../../db";
import bcrypt from "bcrypt";
import {BadRequestError} from "../../errors/BadRequestError";

export const authPatch = (f: FastifyInstance) => {
    f.patch<{ Body: AuthPatch }>('/', withErrorHandler(withAuth(async (
        req,
        resp,
        user
    ) => {
        const {username, password, new_password} = req.body;
        if (!await bcrypt.compare(password, user.password)) {
            throw new BadRequestError("Invalid password");
        }
        await db.users.update({
            where: {id: user.id},
            data: {
                username,
                password: new_password,
            },
        });
        return resp.code(200).send()
    })));
};
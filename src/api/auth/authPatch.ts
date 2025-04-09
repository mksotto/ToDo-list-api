import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {withAuth} from "../../middlewares/withAuth";
import {AuthPatch} from "../../types/domain/todo-list-api";
import {db} from "../../db";
import bcrypt from "bcrypt";
import {BadRequestError} from "../../errors/BadRequestError";
import {ConflictError} from "../../errors/ConflictError";

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
        if (await db.users.findFirst({where: {username}})) {
            throw new ConflictError("Username already exists!");
        }
        await db.users.update({
            where: {id: user.id},
            data: {
                username,
                password: new_password && await bcrypt.hash(new_password, 12),
            },
        });
        return resp.code(200).send()
    })));
};
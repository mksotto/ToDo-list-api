import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {BadRequestError} from "../../errors/BadRequestError";
import {db} from "../../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {COOKIE_NAME, EXPIRES_IN_SECONDS} from "../../constants/constants";
import {AuthLoginPost} from "../../types/domain/todo-list-api";

export const authLoginPost = (f: FastifyInstance) => {
    f.post<{ Body: AuthLoginPost }>('/login', withErrorHandler(async (req, resp) => {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new BadRequestError("MissingCredentials");
        }
        const user = await db.users.findFirst({ where: { username } });
        if (!user) {
            throw new BadRequestError('InvalidUsername');
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new BadRequestError("InvalidPassword");
        }
        const token = jwt.sign({userId: user.id}, process.env.SECRET_KEY!, {expiresIn: EXPIRES_IN_SECONDS});
        return resp.code(200).setCookie(COOKIE_NAME, token, {maxAge: EXPIRES_IN_SECONDS}).send();
    }));
};
import {FastifyInstance} from "fastify";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {BadRequestError} from "../../errors/BadRequestError";
import {db} from "../../db";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import {EXPIRES_IN_SECONDS} from "../../constants/constants";

export const authLoginPost = (f: FastifyInstance) => {
    f.post<{ Body: {username: string, password: string} }>('/login', withErrorHandler(async (req, resp) => {
        const { username, password } = req.body;
        if (!username || !password) {
            throw new BadRequestError("Username and password is required");
        }
        const user = await db.new_users.findFirst({ where: { username } });
        if (!user) {
            throw new BadRequestError("User with that username does not exist");
        }
        const checkPassword = await bcrypt.compare(password, user.password);
        if (!checkPassword) {
            throw new BadRequestError("Invalid password");
        }
        const token = jwt.sign({username}, process.env.SECRET_KEY!, {expiresIn: EXPIRES_IN_SECONDS});
        return resp.code(200).send(token).setCookie('sessionId', token, {maxAge: EXPIRES_IN_SECONDS});
    }));
};

// в authHandler засовываем req.cookie.sessionId + там проверка jwt.decode
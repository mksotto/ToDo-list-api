import {FastifyInstance} from "fastify";
import {db} from "../../db";
import bcrypt from "bcrypt";
import {v7 as uuid} from "uuid";
import {BadRequestError} from "../../errors/BadRequestError";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {ConflictError} from "../../errors/ConflictError";
import {validateEmail} from "../../utils/validateEmail";
import {AuthSignupPost} from "../../types/domain/todo-list-api";
import {EXPIRES_IN_SECONDS} from "../../constants/constants";
import jwt from "jsonwebtoken";

export const authSignupPost = (f: FastifyInstance) => {
    f.post<{ Body: AuthSignupPost }>('/signup', withErrorHandler(async (req, resp) => {
        const {username, email, password} = req.body;
        if (!email || !password) {
            throw new BadRequestError("Email and password is required");
        }
        if (!validateEmail(email)) {
            throw new BadRequestError("Invalid email");
        }
        const checkEmail = await db.users.findFirst({ where: { email } });
        const checkUsername = await db.users.findFirst({ where: { username } });
        if (checkEmail) {
            throw new ConflictError('This email has already been registered.');
        }
        if (checkUsername) {
            throw new ConflictError('This username already registered.');
        }
        const createUserId = uuid();
        await db.users.create({
            data: {
                id: createUserId,
                username,
                email,
                password: await bcrypt.hash(password, 12),
            }
        });
        const token = jwt.sign({userId: createUserId}, process.env.SECRET_KEY!, {expiresIn: EXPIRES_IN_SECONDS});
        return resp.code(201).setCookie('sessionId', token, {maxAge: EXPIRES_IN_SECONDS}).send();
    }));
};
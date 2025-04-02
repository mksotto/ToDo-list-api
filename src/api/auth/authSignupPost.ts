import {FastifyInstance} from "fastify";
import {db} from "../../db";
import bcrypt from "bcrypt";
import {v7 as uuid} from "uuid";
import {BadRequestError} from "../../errors/BadRequestError";
import {withErrorHandler} from "../../middlewares/withErrorHandler";
import {ConflictError} from "../../errors/ConflictError";
import {validateEmail} from "../../utils/validateEmail";

export const authSignupPost = (f: FastifyInstance) => {
    f.post<{ Body: {username?: string, email: string, password: string} }>('/signup', withErrorHandler(async (req, resp) => {
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
        await db.users.create({
            data: {
                id: uuid(),
                username: username || email,
                email: email,
                password: await bcrypt.hash(password, 12),
            }
        });
        resp.code(201).send('Ok');
    }));
};
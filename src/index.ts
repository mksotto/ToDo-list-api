import fastify from 'fastify';
import fastifyCookie from '@fastify/cookie';
import {authHandler} from "./api/auth";
import {tasksHandler} from "./api/tasks";
import {usersHandler} from "./api/users";

const f = fastify({logger: true});

f.register(fastifyCookie, {
    parseOptions: {
        httpOnly: true,
        secure: true,
        path: '/',
    }
});

f.register(authHandler, {prefix: 'auth'});
f.register(tasksHandler, {prefix: 'tasks'});
f.register(usersHandler, {prefix: 'users'});

void f.listen({
    port: 8000,
});

process.once('SIGINT', f.close);
process.once('SIGTERM', f.close);
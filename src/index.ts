import fastify from 'fastify';
import {authHandler} from "./api/auth";
import {tasksHandler} from "./api/tasks";
import fastifyCookie from '@fastify/cookie';

const f = fastify({logger: true});

f.register(fastifyCookie, {
    parseOptions: {
        httpOnly: true,
        secure: true,
    }
});

f.register(authHandler, {prefix: 'auth'});
f.register(tasksHandler, {prefix: 'tasks'});

void f.listen({
    port: 8000,
});

process.once('SIGINT', f.close);
process.once('SIGTERM', f.close);
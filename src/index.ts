import fastify from 'fastify';

const f = fastify({logger: true});

void f.listen({
    port: 8000,
});

process.once('SIGINT', f.close);
process.once('SIGTERM', f.close);
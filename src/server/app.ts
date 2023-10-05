import fastify, { FastifyInstance } from 'fastify';

const app: FastifyInstance = fastify({});

app.ready((err: Error) => {
  if (err) throw err;
});

export default app;

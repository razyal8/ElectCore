import type { FastifyInstance } from 'fastify';

const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', async (_request, reply) => {
    reply.code(200).send('success');
  });
};

export default usersRoutes;

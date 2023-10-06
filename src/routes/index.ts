import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import usersRoutes from './users';
import votersRoutes from './voters';

const healthRoutes = async (fastify: FastifyInstance) => {
  fastify.get('health', async (_request:FastifyRequest, reply:FastifyReply) => reply.code(200).send({ pong: 'Server is alive' }));
};

const registerAllRoutes = async (app:FastifyInstance) => {
  app.register(healthRoutes, { prefix: '/' });
  app.register(usersRoutes, { prefix: '/users' });
  app.register(votersRoutes, { prefix: '/voters' });
};

export default registerAllRoutes;

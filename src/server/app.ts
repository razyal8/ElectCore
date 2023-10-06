import fastify, { type FastifyInstance } from 'fastify';
import registerAllRoutes from '../routes/index';

const app: FastifyInstance = fastify({});

app.ready((err: Error) => {
  if (err) throw err;
});

registerAllRoutes(app);

export default app;

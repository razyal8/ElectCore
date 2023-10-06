import type { FastifyInstance } from 'fastify';
import { findVotersBylimit } from '../collections/voters';
import type { Voter } from '../types/voter';

type getParamVoter = {
  limit:number
};

const votersRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', async (_request, reply) => {
    const params:getParamVoter = _request.query as getParamVoter;
    const votersLimit:number = params.limit;
    const voters:Voter[] = await findVotersBylimit(parseInt(votersLimit.toString(), 10));
    reply.code(200).send(voters);
  });
};

export default votersRoutes;

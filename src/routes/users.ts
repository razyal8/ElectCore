import type { FastifyInstance } from 'fastify';
import { userSchema, type User } from '../types/user';
import { findAllUsers, findUserByUserName, insertUserToDb } from '../collections/users';

type getParamUser = {
  userName:string
};

const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', async (_request, reply) => {
    const users:User[] = await findAllUsers();
    reply.code(200).send(users);
  });

  fastify.get('/:userName', async (_request, reply) => {
    const params:getParamUser = _request.params as getParamUser;
    const userNameParam:string = params.userName;
    const user:User | null = await findUserByUserName(userNameParam);
    reply.code(200).send(user);
  });

  fastify.post('/insert', async (request, reply) => {
    const userBody = request.body;
    const parsedUser = userSchema.parse(userBody);
    await insertUserToDb(parsedUser);
    reply.code(200).send('successfully created new user');
  });
};

export default usersRoutes;

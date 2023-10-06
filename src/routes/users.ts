import type { FastifyInstance } from 'fastify';
import jwt from 'jsonwebtoken';
import { userSchema, type User } from '../types/user';
import {
  findAllUsers, findUserByQuery, findUserByUserName, insertUserToDb,
} from '../collections/users';
import logger from '../helpers/logger';

type getParamUser = {
  username:string
};

const usersRoutes = async (fastify: FastifyInstance) => {
  fastify.get('/', async (_request, reply) => {
    const users:User[] = await findAllUsers();
    reply.code(200).send(users);
  });

  fastify.get('/:userName', async (_request, reply) => {
    const params:getParamUser = _request.params as getParamUser;
    const userNameParam:string = params.username;
    const user:User | null = await findUserByUserName(userNameParam);
    reply.code(200).send(user);
  });

  fastify.post('/insert', async (request, reply) => {
    const userBody = request.body;
    const parsedUser = userSchema.parse(userBody);
    await insertUserToDb(parsedUser);
    reply.code(200).send('successfully created new user');
  });

  fastify.post('/login', async (request, reply) => {
    logger.info('here');
    const userBody = request.body;
    const parsedUser = userSchema.parse(userBody);
    logger.info(parsedUser);
    const user:User | null = await findUserByQuery(parsedUser);
    logger.info(user);
    if (user) {
      const secretKey = 'your-secret-key';
      const token = jwt.sign({ username: user?.username }, secretKey, { expiresIn: '1h' });
      reply.code(200).send({ token });
    } else {
      reply.code(400).send('Invalid username or password');
    }
  });
};

export default usersRoutes;

import config from './config/config';
import { connectToDB } from './database/client';
import logger from './helpers/logger';
import { startServer } from './server/server';

const { mongoUrl } = config;

const loadProgram = async (): Promise<void> => {
  logger.info(`Starting ${process.env.NODE_ENV} app`);
  try {
    await startServer();
    await connectToDB(mongoUrl);
  } catch (err) {
    logger.error(err, 'Failed to load program');
  }
};

export default loadProgram;

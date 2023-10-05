import logger from '../helpers/logger';
import app from './app';
import config from '../config/config';

export const startServer = async (): Promise<void> => {
  try {
    const { serverPort } = config;
    await app.listen({ port: serverPort, host: '0.0.0.0' });
    logger.info(`Listening on port: ${serverPort}`);
  } catch (err) {
    logger.error(err, 'Error starting server');
    process.exit(1);
  }
};

export const closeServer = async () => {
  try {
    await app.close();
    logger.info('Server is closing');
  } catch (err) {
    logger.error(err, 'Error closing server');
    process.exit(1);
  }
};

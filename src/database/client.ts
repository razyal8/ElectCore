import { MongoClient } from 'mongodb';

import logger from '../helpers/logger';

let client: MongoClient | null = null;

export const connectToDB = async (url: string) => {
  try {
    client = new MongoClient(url);
    await client.connect();
    logger.info('Successfully connected to DB');
  } catch (error) {
    throw new Error('Failed to connect to mongodb', { cause: error });
  }
};

export const closeDB = async () => {
  if (!client) throw new Error('Client is never connected');
  await client.close();
  logger.info('Successfully disconnected mongo DB');
};

export const getClient = () => client;

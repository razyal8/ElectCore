import config from './config/config';
import { connectToDB } from './database/client';
import logger from './helpers/logger';
import { startServer } from './server/server';
// import { addVotersToDB } from './utils/add-to-excel';
import { excelToPersonObjects } from './utils/convert-excel-obj';

const { mongoUrl } = config;

const loadProgram = async (): Promise<void> => {
  logger.info(`Starting ${process.env.NODE_ENV} app`);
  try {
    await startServer();
    await connectToDB(mongoUrl);
    await excelToPersonObjects('./Book1.xlsx');
    // await addVotersToDB();
  } catch (err) {
    logger.error(err, 'Failed to load program');
  }
};

export default loadProgram;

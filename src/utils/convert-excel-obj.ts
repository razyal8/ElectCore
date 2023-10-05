import * as xlsx from 'xlsx';
import * as fs from 'fs';
import { faker } from '@faker-js/faker';
import logger from '../helpers/logger';
import { insertVoterToDb } from '../collections/election-day';
import type { Voter } from '../types/voter';

// Define a TypeScript type for your data

// eslint-disable-next-line consistent-return
export const excelToPersonObjects = async (inputFilePath: string) => {
  try {
    // const readthefile = xlsx.readFile(inputFilePath)
    const fileData = fs.readFileSync(inputFilePath);

    // Parse the file data using xlsx
    const workbook = xlsx.read(fileData, { type: 'buffer' });

    // Assuming the data is in the first worksheet
    const worksheet = workbook.Sheets[workbook.SheetNames[0]!];

    // Convert the worksheet to an array of objects
    const data = xlsx.utils.sheet_to_json(worksheet!);

    logger.info(data);
    await Promise.all(data.map(async (voterData:any) => {
      // const voter = createRandomVoter();
      const voter:Voter = {
        _id: faker.string.uuid(),
        firstName: voterData.firstName,
        lastName: voterData.lastName,
        birthday: voterData.birthday,
        sex: voterData.sex,
      };
      await insertVoterToDb(voter);
      logger.info(`${voter.firstName} is added to db`);
    }));
  } catch (error) {
    logger.error(error);
  }
};

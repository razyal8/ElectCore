import { faker } from '@faker-js/faker';
import { insertVoterToDb } from '../collections/election-day';
import logger from '../helpers/logger';
import type { Voter } from '../types/voter';

function createRandomVoter(): Voter {
  return {
    _id: faker.string.uuid(),
    firstName: faker.person.firstName(),
    lastName: faker.helpers.arrayElement(['אבוסעדה', 'עזאם', 'סאבא', 'כיוף', 'מנסור', 'אבו רוקן', 'שחידם', 'לילאוי', 'אבו אלזלף']),
    birthday: faker.date.birthdate(),
    sex: faker.person.sexType(),
  };
}

export const addVotersToDB = async () => {
  try {
    await Promise.all(Array.from({ length: 2 }).map(async () => {
      const voter = createRandomVoter();
      await insertVoterToDb(voter);
      logger.info(`${voter.firstName} is added to db`);
    }));
  } catch (error) {
    throw new Error('Failed adding plans to db', { cause: error });
  }
};

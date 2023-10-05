import DbOperations from '../database/operations';
import config from '../config/config';
import type { Voter } from '../types/voter';

const collectionName = 'election-day';
let db: DbOperations<Voter>;

const getDb = () => {
  if (!db) { db = new DbOperations(collectionName, config.dbName); }
  return db;
};

export const insertVoterToDb = async (voter:Voter) => await getDb()
  .insertOne(voter);

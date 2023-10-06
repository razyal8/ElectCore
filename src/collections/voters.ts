import DbOperations from '../database/operations';
import config from '../config/config';
import type { Voter } from '../types/voter';

const collectionName = 'voters-beta';
let db: DbOperations<Voter>;

const getDb = () => {
  if (!db) { db = new DbOperations(collectionName, config.dbName); }
  return db;
};

export const insertVoterToDb = async (voter:Voter) => await getDb()
  .insertOne(voter);

export const findVotersByQuery = async (query: object)
: Promise<Voter[]> => await getDb().findByQuery(query);

export const findVotersBylimit = async (limit:number)
: Promise<Voter[]> => await getDb().findByQuery({}, {}, {}, limit);

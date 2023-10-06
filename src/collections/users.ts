import DbOperations from '../database/operations';
import config from '../config/config';
import type { User } from '../types/user';

const collectionName = 'users';
let db: DbOperations<User>;

const getDb = () => {
  if (!db) { db = new DbOperations(collectionName, config.dbName); }
  return db;
};

export const insertUserToDb = async (user:User) => await getDb()
  .insertOne(user);

export const findUserByUserName = async (userName:string):
Promise<User | null> => await getDb().findOneByQuery({ userName });

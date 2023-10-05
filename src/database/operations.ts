import type {
  Collection, DeleteResult, Document, Sort, InsertManyResult,
  InsertOneResult, UpdateOptions, UpdateResult, UpdateFilter,
} from 'mongodb';
import { getClient } from './client';

const addDateToFields = (key: string) => (object: object) => ({ ...object, [key]: new Date() });
const addCreationDate = addDateToFields('createdAt');
const addUpdateDate = addDateToFields('updatedAt');

class Operations<T extends Document> {
  collection: Collection;

  constructor(collectionName: string, dbName: string) {
    const client = getClient();
    if (!client) throw new Error('Connect to the database first');
    this.collection = client.db(dbName).collection(collectionName);
  }

  async insertOne(doc: T): Promise<InsertOneResult> {
    const docWithCreationDate = addCreationDate(doc);
    return await this.collection.insertOne(docWithCreationDate);
  }

  async insertMany(docs: T[]): Promise<InsertManyResult> {
    const docsWithCreationDate = docs.map(addCreationDate);
    const result = await this.collection.insertMany(docsWithCreationDate, { ordered: false });
    result.insertedIds = Object.values(result.insertedIds);
    return result;
  }

  async findOneByQuery(query: any): Promise<T | null> {
    return await this.collection.findOne(query) as T | null;
  }

  async findByQuery(query: any, sort: Sort = {}, projection: object = {}, limit: number = 0)
    :Promise<T[]> {
    return await this.collection.find(query).sort(sort).project(projection).limit(limit)
      .toArray() as T[];
  }

  async updateOne(query: any, update: UpdateFilter<T>, options:UpdateOptions = {})
    : Promise<UpdateResult> {
    const changesWithUpdateDate = addUpdateDate(update);
    return await this.collection.updateOne(query, { $set: changesWithUpdateDate }, options);
  }

  async addToSetOne(query: any, update: UpdateFilter<T>, options:UpdateOptions = {})
    : Promise<UpdateResult> {
    const changesWithUpdateDate = addUpdateDate({});
    return await this.collection.updateOne(query, {
      $set: changesWithUpdateDate,
      $addToSet: update,
    }, options);
  }

  async updateByIds(ids: any, update: Partial<T>): Promise<UpdateResult | Document> {
    const changesWithUpdateDate = addUpdateDate(update);
    return await this.collection.updateMany({ _id: { $in: ids } }, { $set: changesWithUpdateDate });
  }

  async updateById(id: any, update: Partial<T>): Promise<UpdateResult> {
    const changesWithUpdateDate = addUpdateDate(update);
    return await this.collection.updateOne({ _id: id }, { $set: changesWithUpdateDate });
  }

  async aggregate(pipeline: object[]) {
    return await this.collection.aggregate(pipeline).toArray();
  }

  async deleteMany(query: any): Promise<DeleteResult> {
    return await this.collection.deleteMany(query);
  }

  async upsertOne(query:any, update:Partial<T>): Promise<UpdateResult> {
    return await this.collection.updateOne(
      query,
      { $set: update, $setOnInsert: addCreationDate({}) },
      { upsert: true },
    );
  }
}

export default Operations;

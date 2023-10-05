import * as dotenv from 'dotenv';

dotenv.config();

const config = {
  mongoUrl: process.env.MONGO_URL!,
  dbName: 'VoteVault',
  serverPort: Number(process.env.PORT) || 4000,

};

export default config;

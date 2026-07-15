import { MongoClient, Db } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const uri = process.env.MONGO_URI || '';
const client = new MongoClient(uri);

let db: Db;
export const connectDB = async () => {
  try {

    // Connect to the MongoDB server deployment
    // await client.connect();

    db = client.db("Aroyana-Exclusives"); 
    console.log('MongoDB Connected Successfully!');
  } catch (error) {
    console.error(' MongoDB Connection Error:', error);
    // process.exit(1); // Deployment 
  }
};

export const getDB = (): Db => {
  if (!db) {
    throw new Error('Database not initialized! Call connectDB first.');
  }
  return db;
};
import { MongoClient } from "mongodb";
export const client = await MongoClient.connect(
  "mongodb://localhost:27017/ecommerce"
);

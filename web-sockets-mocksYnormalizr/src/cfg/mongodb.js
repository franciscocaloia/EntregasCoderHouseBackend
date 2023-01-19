import { MongoClient } from "mongodb";
export const client = await MongoClient.connect(
  "mongodb+srv://franciscocaloia:clemente12@coderhouse.ubggka6.mongodb.net/?retryWrites=true&w=majority"
);

import { MongoClient } from "mongodb";
import { MONGO_URL } from "./config.js";
export const client = await MongoClient.connect(MONGO_URL);

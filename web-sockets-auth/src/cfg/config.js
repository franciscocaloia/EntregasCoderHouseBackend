import dotenv from "dotenv";
import os from "os";
dotenv.config();
export const MONGO_URL = process.env.MONGO_URL;
export const SESSION_SECRET = process.env.SESSION_SECRET;
import parse from "yargs/yargs";
const yargs = parse(process.argv.slice(2));
export const args = yargs.default({
  port: 8080,
  mode: "FORK",
}).argv;
export const cpus = os.cpus().length;

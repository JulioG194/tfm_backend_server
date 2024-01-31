import 'dotenv/config';
import { DatabaseConfig } from "./db.config";

/* export const databaseConfig: DatabaseConfig = {
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? '',
  port: process.env.DB_PORT?? '',
  uri: process.env.DB_URI ?? '',
}; */

const databaseConfig: DatabaseConfig = {
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? '',
  port: process.env.DB_PORT?? '',
  uri: process.env.DB_URI ?? '',
};

const { username, password, uri, database, port: mongoport } = databaseConfig;

export const mongoURI = `mongodb://${username}:${password}@${uri}:${mongoport}/${database}?authSource=admin`;
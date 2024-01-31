import 'dotenv/config';
import express, { Express } from "express";
import securityMiddleware from "./middlewares/securityMiddleware";
import apiRoute from "./core/shared/routes/ApiRoutes";
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';
import { logger } from './core/shared/Logger';
import { connect } from 'mongoose';
import { DatabaseConfig } from './config/database/db.config';
//import { databaseConfig } from './config/database/db.connection';

const databaseConfig: DatabaseConfig = {
  username: process.env.DB_USERNAME ?? '',
  password: process.env.DB_PASSWORD ?? '',
  database: process.env.DB_NAME ?? '',
  port: process.env.DB_PORT?? '',
  uri: process.env.DB_URI ?? '',
};

const { username, password, uri, database, port: mongoport } = databaseConfig;

const mongoURI = `mongodb://${username}:${password}@${uri}:${mongoport}/${database}?authSource=admin`;


const app: Express = express();
const port = process.env.PORT ?? 5000;

async function startServer() {
try {
await connect(mongoURI );

//app.use((req, res, next) => {
 // logger.info(`${req.method} ${req.url}`);
 // next();
//});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(securityMiddleware);
app.use('/api', apiRoute);

app.use(handleErrorMiddleware);
app.use((req, res, next) => {
  res.status(404).json({ error: "Not Found", message: "Ruta no encontrada" });
});

app.use((err: any, req: any, res:any, next: any) => {
  console.error(err);
  const statusCode = err.statusCode ?? 500;
  res.status(statusCode).json({ error: "Error Interno", message: err.message });
});

    app.listen(port, () => {
      logger.info(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.log('error', error);
    logger.error("Failed to connect to MongoDB", error);
  }
}

startServer();
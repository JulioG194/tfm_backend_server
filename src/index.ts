import 'dotenv/config';
import express, { Express } from "express";
// import connection from "./config/database/db.connection";
import securityMiddleware from "./middlewares/securityMiddleware";
import apiRoute from "./core/shared/routes/ApiRoutes";
import clientRoute from "./core/OAuthServer/application/route";
import oauthRoute from "./core/OAuthServer/application/route/oauthRoute";
import uploadFileRoute from "./core/shared/upload/UploadFileRoute";
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';
import { logger } from './core/shared/Logger';
import { connect } from 'mongoose';
import dbConnection from "./config/database/db.connection";

const app: Express = express();
const port = process.env.PORT ?? 5000;

async function startServer() {
try {
//await connection();
await connect(dbConnection.mongoURI, dbConnection.options );
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(securityMiddleware);
app.use(clientRoute);
app.use(oauthRoute);
app.use(uploadFileRoute);
app.use('/api', apiRoute);
//app.use((req, res, next) => {
 // logger.info(`${req.method} ${req.url}`);
 // next();
//});
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
    logger.error("Failed to connect to MongoDB", error);
  }
}

startServer();
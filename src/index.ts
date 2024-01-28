import 'dotenv/config';
import express, { Express } from "express";
import connection from "./config/database/db.connection";
import securityMiddleware from "./middlewares/securityMiddleware";
import apiRoute from "./core/shared/routes/ApiRoutes";
import clientRoute from "./core/OAuthServer/application/route";
import oauthRoute from "./core/OAuthServer/application/route/oauthRoute";
import uploadFileRoute from "./core/shared/upload/UploadFileRoute";
import handleErrorMiddleware from './middlewares/handleErrorMiddleware';
import { logger } from './core/shared/Logger';

const app: Express = express();
const port = process.env.PORT ?? 3000;

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
  res.status(404).json({ error: "Not Found", message: "La ruta solicitada no existe" });
});

app.use((err: any, req: any, res:any, next: any) => {
  console.error(err);
  const statusCode = err.statusCode ?? 500;
  res.status(statusCode).json({ error: "Error Interno", message: err.message });
});


async function startServer() {
  try {
    await connection();
    app.listen(port, () => {
      logger.info(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    logger.error("Failed to connect to MongoDB", error);
  }
}

startServer();
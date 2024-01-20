import 'dotenv/config';
import express, { Express } from "express";
import connection from "./config/database/db.connection";
import securityMiddleware from "./middlewares/securityMiddleware";
import userCredentialRoute from "./core/UserCredential/application/route";
import clientRoute from "./core/OAuthServer/application/route";
import oauthRoute from "./core/OAuthServer/application/route/oauthRoute";

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(securityMiddleware);
app.use('/user',userCredentialRoute)
app.use(clientRoute);
app.use(oauthRoute);

async function startServer() {
  try {
    await connection();
    app.listen(port, () => {
      console.log(`[server]: Server is running at http://localhost:${port}`);
    });
  } catch (error) {
    console.error("Failed to connect to MongoDB", error);
  }
}

startServer();
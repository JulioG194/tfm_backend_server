import { Router } from "express";
import { OAuthServerController } from "../controller/OAuthServerController";

const route = Router()
const oauthCtrl = new OAuthServerController();
route.post('/oauth/token', oauthCtrl.authToken)

export default route
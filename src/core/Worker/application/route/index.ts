import { Router } from "express";
import RegisterInfoRoute from "./RegisterInfoRoute";
import GetterInfoRoute from "./GetterInfoRoute"
import { OAuthAuthenticateController } from "../../../OAuthServer/application/controller/OAuthAuthenticateCtrl";
const route = Router();
const oauthController = new OAuthAuthenticateController();

route.use(oauthController.authenticate);
route.use(RegisterInfoRoute);
route.use(GetterInfoRoute);

export default route;


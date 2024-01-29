import { Router } from "express";
import RegisterInfoRoute from "./RegisterInfoRoute";
import GetterInfoRoute from './GetterInfoRoute';
import SearchInfoByEmailRoute from "./GetterInfoByEmailRoute";
import UpdaterInfoRoute from "./UpdaterInfoRoute"; 
import { OAuthAuthenticateController } from "../../../OAuthServer/application/controller/OAuthAuthenticateCtrl";

const route = Router();
const oauthController = new OAuthAuthenticateController();

route.use(oauthController.authenticate);
route.use(SearchInfoByEmailRoute);
route.use(RegisterInfoRoute);
route.use(UpdaterInfoRoute);
route.use(GetterInfoRoute);

export default route;
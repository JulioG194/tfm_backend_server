import { Router } from "express";
import RegisterInfoRoute from "./RegisterInfoRoute";
import GetterInfoRoute from "./GetterInfoRoute"
import GetterInfoAllRoute from "./GetterInfoAllRoute"
import SearchInfoByEmailRoute from "./GetterInfoByEmailRoute";
import UpdaterInfoRoute from "./UpdaterInfoRoute"; 
import UpdaterInfoJobsRoute from "./UpdaterInfoJobsRoute"; 
import { OAuthAuthenticateController } from "../../../OAuthServer/application/controller/OAuthAuthenticateCtrl";
const route = Router();
const oauthController = new OAuthAuthenticateController();

route.use(oauthController.authenticate);
route.use(SearchInfoByEmailRoute);
route.use(GetterInfoAllRoute);
route.use(GetterInfoRoute);
route.use(RegisterInfoRoute);
route.use(UpdaterInfoRoute);
route.use(UpdaterInfoJobsRoute);

export default route;


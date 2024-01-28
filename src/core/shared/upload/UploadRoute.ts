import { Router } from "express";
import UploadFileRoute from "../../shared/upload/UploadFileRoute";
import { OAuthAuthenticateController } from "../../OAuthServer/application/controller/OAuthAuthenticateCtrl";

const route = Router();
const oauthController = new OAuthAuthenticateController();

route.use(oauthController.authenticate);
route.use(UploadFileRoute);

export default route;
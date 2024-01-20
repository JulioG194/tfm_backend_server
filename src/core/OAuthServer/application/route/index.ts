import { Router } from "express";
import { OAuthCredentialController } from "../controller/OAuthCredentialCtrl";

const route = Router()
const clientCtrl = new OAuthCredentialController();
route.post(`/client`, clientCtrl.registerClientCtrl)

export default route
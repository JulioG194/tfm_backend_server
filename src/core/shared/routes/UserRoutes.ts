import { Router } from "express";
import registerUser from "../../UserCredential/application/route/index";
import registerUserInfo from "../../User/application/route/index";
const route = Router();

route.use(registerUser);
route.use(registerUserInfo);

export default route
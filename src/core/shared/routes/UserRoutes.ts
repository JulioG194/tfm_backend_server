import { Router } from "express";
import registerUser from "../../UserCredential/application/route/index";

const route = Router();

route.use(registerUser);

export default route
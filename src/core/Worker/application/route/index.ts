import { Router } from "express";
import RegisterInfoRoute from "./RegisterInfoRoute";
import GetterInfoRoute from "./GetterInfoRoute"
const route = Router();

route.use(RegisterInfoRoute);
route.use(GetterInfoRoute);

export default route;


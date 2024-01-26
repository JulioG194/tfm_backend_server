import { Router } from "express";
import RegisterInfoRoute from "./RegisterInfoRoute";
const route = Router();

route.use(RegisterInfoRoute);

export default route;
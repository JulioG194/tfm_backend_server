import { Router } from "express";
import { UserController } from "../controller";
import { UserRegister } from "../useCases/UserRegister";
import { MongoUserRepository } from "../../infrastructure/repositoryImpl/MongoUserRepository";

const route = Router();
const userRepo = new MongoUserRepository();
const userRegister = new UserRegister(userRepo);
const userCtrl = new UserController(userRegister);
route.post(`/register-info`, userCtrl.registerCtrl);

export default route
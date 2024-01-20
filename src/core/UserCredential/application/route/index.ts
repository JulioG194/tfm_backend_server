import { Router } from "express";
import { MongoUserCredentialRepository } from "../../infrastructure/repositoryImpl/MongoUserCredentialRepository";
import { UserCredentialRegister } from '../useCases/UserCredentialRegister';
import { UserCredentialController } from "../controller";

const route = Router();
const userCredentialRepo = new MongoUserCredentialRepository();
const userCredentialRegister = new UserCredentialRegister(userCredentialRepo);
const userCtrl = new UserCredentialController(userCredentialRegister);
route.post(`/register`, userCtrl.registerCtrl);

export default route
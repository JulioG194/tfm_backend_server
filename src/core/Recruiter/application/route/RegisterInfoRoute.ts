import { Router } from "express";
import { RecruiterRegisterController } from "../controller";
import { RecruiterRegister } from "../useCases/RecruiterRegister";
import { MongoRecruiterRepository } from "../../infrastructure/repositoryImpl/MongoRecruiterRepository";

const route = Router();
const recruiterRepo = new MongoRecruiterRepository();
const recruiterRegister = new RecruiterRegister(recruiterRepo);
const recruiterCtrl = new RecruiterRegisterController(recruiterRegister);
route.post(`/register-info`, recruiterCtrl.registerCtrl);

export default route;
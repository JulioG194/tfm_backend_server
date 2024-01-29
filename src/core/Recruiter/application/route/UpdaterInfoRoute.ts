import { Router } from "express";
import { MongoRecruiterRepository } from "../../infrastructure/repositoryImpl/MongoRecruiterRepository";
import { RecruiterUpdater } from "../useCases";
import { RecruiterUpdaterController } from "../controller";

const route = Router();
const recruiterRepo = new MongoRecruiterRepository();
const recruiterUpdater = new RecruiterUpdater(recruiterRepo);
const recruiterUpdaterCtrl = new RecruiterUpdaterController(recruiterUpdater);
route.put('/update-info', recruiterUpdaterCtrl.updaterCtrl);

export default route
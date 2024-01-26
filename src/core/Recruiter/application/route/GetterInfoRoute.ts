import { Router } from "express";
import { RecruiterGetterController } from "../controller";
import { RecruiterGetter } from "../useCases/RecruiterGetter";
import { MongoRecruiterRepository } from "../../infrastructure/repositoryImpl/MongoRecruiterRepository";

const route = Router();
const recruiterRepo = new MongoRecruiterRepository();
const recruiterGetter = new RecruiterGetter(recruiterRepo);
const recruiterGetterCtrl = new RecruiterGetterController(recruiterGetter);
route.get('/:id', recruiterGetterCtrl.getterCtrl);

export default route
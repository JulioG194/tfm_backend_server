import { Router } from "express";
import { RecruiterRegisterController } from "../controller";
import { RecruiterRegister, } from "../useCases/RecruiterRegister";
import { MongoRecruiterRepository } from "../../infrastructure/repositoryImpl/MongoRecruiterRepository";
import { RecruiterGetterWithEmail } from "../useCases";
import { RecruiterGetterWithEmailController } from "../controller/RecruiterGetterWithEmailCtrl";

const route = Router();
const recruiterRepo = new MongoRecruiterRepository();
const recruiterGetterByEmail= new RecruiterGetterWithEmail(recruiterRepo);
const recruiterGetterByEmailCtrl = new RecruiterGetterWithEmailController(recruiterGetterByEmail);
route.get('/search', recruiterGetterByEmailCtrl.getterCtrl);

export default route
import { Router } from "express";
import { WorkerRegisterController } from "../controller";
import { WorkerRegister, } from "../useCases/WorkerRegister";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";
import { WorkerGetterWithEmail } from "../useCases";
import { WorkerGetterWithEmailController } from "../controller/WorkerGetterWithEmailCtrl";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerGetterByEmail= new WorkerGetterWithEmail(workerRepo);
const workerGetterByEmailCtrl = new WorkerGetterWithEmailController(workerGetterByEmail);
route.get('/search', workerGetterByEmailCtrl.getterCtrl);

export default route
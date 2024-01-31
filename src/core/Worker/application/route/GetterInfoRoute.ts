import { Router } from "express";
import { WorkerGetterController } from "../controller";
import { WorkerGetter } from "../useCases/WorkerGetter";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerGetter = new WorkerGetter(workerRepo);
const workerGetterCtrl = new WorkerGetterController(workerGetter);
route.get('/info/:id', workerGetterCtrl.getterCtrl);

export default route
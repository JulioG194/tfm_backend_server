import { Router } from "express";
import { WorkerGetterAllController, WorkerGetterController } from "../controller";
import { WorkerGetter } from "../useCases/WorkerGetter";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";
import { WorkerGetterAll } from "../useCases/WrokerGetterAll";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerGetterAll = new WorkerGetterAll(workerRepo);
const workerGetterAllCtrl = new WorkerGetterAllController(workerGetterAll);
route.get('/all', workerGetterAllCtrl.getterAllCtrl);

export default route
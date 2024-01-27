import { Router } from "express";
import { WorkerRegisterController } from "../controller";
import { WorkerRegister, } from "../useCases/WorkerRegister";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";
import { WorkerUpdater } from "../useCases";
import { WorkerUpdaterController } from "../controller";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerUpdater = new WorkerUpdater(workerRepo);
const workerUpdaterCtrl = new WorkerUpdaterController(workerUpdater);
route.post('/update-info', workerUpdaterCtrl.updaterCtrl);

export default route
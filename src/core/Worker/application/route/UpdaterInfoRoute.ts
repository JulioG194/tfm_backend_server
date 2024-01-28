import { Router } from "express";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";
import { WorkerUpdater } from "../useCases";
import { WorkerUpdaterController } from "../controller";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerUpdater = new WorkerUpdater(workerRepo);
const workerUpdaterCtrl = new WorkerUpdaterController(workerUpdater);
route.put('/update-info', workerUpdaterCtrl.updaterCtrl);

export default route
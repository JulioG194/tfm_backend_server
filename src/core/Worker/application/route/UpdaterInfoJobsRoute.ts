import { Router } from "express";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";
import { WorkerUpdaterJobs } from "../useCases";
import { WorkerUpdaterJobsController } from "../controller";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerUpdaterJobs = new WorkerUpdaterJobs(workerRepo);
const workerUpdaterJobsCtrl = new WorkerUpdaterJobsController(workerUpdaterJobs);
route.put('/update-jobs', workerUpdaterJobsCtrl.updaterJobsCtrl);

export default route
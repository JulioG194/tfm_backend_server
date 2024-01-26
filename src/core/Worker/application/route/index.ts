import { Router } from "express";
import { WorkerController } from "../controller";
import { WorkerRegister, } from "../useCases/WorkerRegister";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerRegister = new WorkerRegister(workerRepo);
const workerCtrl = new WorkerController(workerRegister);
route.post(`/register-info`, workerCtrl.registerCtrl);

export default route
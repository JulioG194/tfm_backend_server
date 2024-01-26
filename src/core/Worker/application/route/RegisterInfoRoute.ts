import { Router } from "express";
import { WorkerRegisterController } from "../controller";
import { WorkerRegister, } from "../useCases/WorkerRegister";
import { MongoWorkerRepository } from "../../infrastructure/repositoryImpl/MongoWorkerRepository";

const route = Router();
const workerRepo = new MongoWorkerRepository();
const workerRegister = new WorkerRegister(workerRepo);
const workerRegisterCtrl = new WorkerRegisterController(workerRegister);
route.post(`/register-info`, workerRegisterCtrl.registerCtrl);

export default route
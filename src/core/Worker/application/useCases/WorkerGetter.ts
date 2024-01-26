import { WorkerRepository } from "../../domain/WorkerRepository";
import { WorkerValue } from "../../domain/WorkerValue";

export class WorkerRegister{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async (workerRequest: workerRequestGetter) => {
        const worker = await this.workerRepository.findById(workerRequest.id);
        return worker;
    }
}

interface workerRequestGetter {
    id: string; 
}
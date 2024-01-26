import { WorkerRepository } from "../../domain/WorkerRepository";

export class WorkerGetter{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async (workerRequest: WorkerRequestGetter) => {
        const worker = await this.workerRepository.findById(workerRequest.id);
        return worker;
    }
}

interface WorkerRequestGetter {
    id: string; 
}
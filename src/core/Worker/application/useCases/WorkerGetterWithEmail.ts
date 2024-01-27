import { WorkerRepository } from "../../domain/WorkerRepository";

export class WorkerGetterWithEmail{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async (workerRequest: WorkerRequestGetter) => {
        const worker = await this.workerRepository.searchByEmail(workerRequest.email);
        return worker;
    }
}

interface WorkerRequestGetter {
    email: string; 
}
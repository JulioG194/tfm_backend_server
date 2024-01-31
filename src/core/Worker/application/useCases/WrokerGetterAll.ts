import { WorkerRepository } from "../../domain/WorkerRepository";

export class WorkerGetterAll{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async () => {
        const workers = await this.workerRepository.findAll();
        return workers;
    }
}
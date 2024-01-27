import { WorkerRepository } from "../../domain/WorkerRepository";

export class WorkerUpdater{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async (workerRequestUpdater: WorkerRequestUpdater) => {
        const workerUpdated = await this.workerRepository.update(workerRequestUpdater);
        return workerUpdated;
    }
}

interface WorkerRequestUpdater {
    id: string;
    name: string;
    surname: string;
    email: string;
    phoneNumber: string;
    sex: string;
    employment:string;
    description: string;
    province:string;
    city:string;
    postalCode: string;
    address: string;
    avatar: string;
}
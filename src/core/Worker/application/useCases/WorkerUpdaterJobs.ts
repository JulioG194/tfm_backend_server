import { JobEntity } from "../../../Job/domain/JobEntity";
import { WorkerRepository } from "../../domain/WorkerRepository";

export class WorkerUpdaterJobs{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async (workerRequestUpdater: WorkerRequestUpdater) => {
        const workerUpdated = await this.workerRepository.addJobs(workerRequestUpdater.email, workerRequestUpdater.jobs);
        return workerUpdated;
    }
}

interface WorkerRequestUpdater {
    email: string;
    jobs: JobEntity[]
}
import { WorkerRepository } from "../../domain/WorkerRepository";
import { WorkerValue } from "../../domain/WorkerValue";

export class WorkerRegister{
    constructor(private workerRepository:WorkerRepository) {}

    public run = async (workerRequest: workerRequestRegister) => {
        const workerValue = new WorkerValue({...workerRequest})
        console.log('uv', workerValue);
        const userRegistered = await this.workerRepository.register(workerValue);
        return userRegistered;
    }
}

interface workerRequestRegister {
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
}
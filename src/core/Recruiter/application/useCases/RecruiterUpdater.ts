import { RecruiterRepository } from "../../domain/RecruiterRepository";

export class RecruiterUpdater{
    constructor(private recruiterRepository:RecruiterRepository) {}

    public run = async (recruiterRequestUpdater: RecruiterRequestUpdater) => {
        const recruiterUpdated = await this.recruiterRepository.update(recruiterRequestUpdater);
        return recruiterUpdated;
    }
}

interface RecruiterRequestUpdater {
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
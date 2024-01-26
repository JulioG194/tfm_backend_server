import { RecruiterRepository } from "../../domain/RecruiterRepository";
import { RecruiterValue } from "../../domain/RecruiterValue";

export class RecruiterGetter{
    constructor(private recruiterRepository:RecruiterRepository) {}

    public run = async (recruiterRequest: RecruiterRequestGetter) => {
        const recruiter = await this.recruiterRepository.findById(recruiterRequest.id);
        return recruiter;
    }
}

interface RecruiterRequestGetter {
    id: string; 
}
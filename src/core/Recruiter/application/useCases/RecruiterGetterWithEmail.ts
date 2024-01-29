import { RecruiterRepository } from "../../domain/RecruiterRepository";

export class RecruiterGetterWithEmail{
    constructor(private recruiterRepository:RecruiterRepository) {}

    public run = async (recruiterRequest: RecruiterRequestGetter) => {
        const recruiter = await this.recruiterRepository.searchByEmail(recruiterRequest.email);
        return recruiter;
    }
}

interface RecruiterRequestGetter {
    email: string; 
}
import { RecruiterRepository } from "../../domain/RecruiterRepository";
import { RecruiterValue } from "../../domain/RecruiterValue";

export class RecruiterRegister{
    constructor(private recruiterRepository:RecruiterRepository) {}

    public run = async (recruiterRequest: RecruiterRequestRegister) => {
        const recruiterValue = new RecruiterValue({...recruiterRequest})
        const recruiterRegistered = await this.recruiterRepository.register(recruiterValue);
        return recruiterRegistered;
    }
}

interface RecruiterRequestRegister {
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
    images: string[]
}
import { UserRepository } from "../../domain/UserRepository";
import { UserValue } from "../../domain/UserValue";

export class UserRegister{
    constructor(private userRepository:UserRepository) {}

    public run = async (userRequest: userRequestRegister) => {
        const userValue = new UserValue({...userRequest})
        console.log('uv', userValue);
        const userRegistered = await this.userRepository.register(userValue);
        return userRegistered;
    }
}

interface userRequestRegister {
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
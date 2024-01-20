import { UserCredentialRepository } from "../../domain/UserCredentialRepository";
import { UserCredentialValue } from "../../domain/UserCredentialValue";

export class UserCredentialRegister{
    constructor(private userCredentialRepository: UserCredentialRepository) {}

    public run = async (userCredentialRequest: userCredentialRequest) => {
        const userCredentialValue = new UserCredentialValue({ ...userCredentialRequest });
        const userRegistered = await this.userCredentialRepository.register(userCredentialValue);
        return userRegistered;
    }
}

interface userCredentialRequest {
    username: string,
    password: string,
    role: string;
    permissions: string[];
}
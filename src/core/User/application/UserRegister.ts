import { UserRepository } from "../domain/UserRepository";
import { UserValue } from "../domain/UserValue";

export class UserRegister{
    constructor(private userRepository:UserRepository) {}

    public registerUser = async (userRequest: userRequestRegister) => {
        const userValue = new UserValue({ ...userRequest });
        const userRegistered = await this.userRepository.register(userValue);
        return userRegistered;
    }
}

interface userRequestRegister {
    id: string;
    name: string,
    surname: string,
    email: string,
    birthdate: Date,
    cellphone: string,
    gender: string
}
import { UserEntity } from "./UserEntity";

export class UserValue implements UserEntity{
    id: string;
    name: string;
    surname: string;
    email: string;
    birthdate: Date;
    cellphone: string;
    gender: string;
  
    constructor({ id ,name, surname, email, birthdate, cellphone, gender }: {
                id:string, 
                name: string, 
                surname: string, 
                email: string, 
                birthdate: Date, 
                cellphone: string, 
                gender: string
              }
                ) {
        this.id = id;
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.birthdate = birthdate;
        this.cellphone = cellphone;
        this.gender = gender;
    }
  
  }

import { WorkerEntity } from "./WorkerEntity";
import { v4 as uuidv4 } from 'uuid';

export class WorkerValue implements WorkerEntity{
  id: string;
  name?: string;
  surname?: string;
  email?: string;
  phoneNumber?: string;
  sex?: string;
  employment?:string;
  description?: string;
  province?:string;
  city?:string;
  postalCode?: string;
  address?: string;
  
    constructor({ name, surname, 
                  email, phoneNumber, sex, 
                  employment, description, 
                  province, city, postalCode, address }: {
                    
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
                ) {
        this.id = uuidv4();
        this.name = name;
        this.surname = surname;
        this.email = email;
        this.phoneNumber = phoneNumber;
        this.sex = sex;
        this.employment = employment;
        this.description = description;
        this.province = province;
        this.city = city;
        this.postalCode = postalCode;
        this.address = address;
    }
  
  }

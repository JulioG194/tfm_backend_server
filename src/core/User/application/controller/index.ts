import { Request, Response } from "express";
import { WorkerRegister } from "../useCases/WorkerRegister";

export class WorkerController {
  constructor(private workerRegister: WorkerRegister) {}
  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
        await this.workerRegister.run({
          name: body.name,
          surname: body.surname,
          email: body.email,
          phoneNumber: body.phoneNumber,
          sex: body.sex,
          employment: body.employment,
          description: body.description,
          province: body.province,
          city: body.city,
          postalCode: body.postalCode,
          address: body.address,
        });
        res.status(200).send({ message: 'Worker registered sucessfully' });
    } catch(error){
        res.status(400).send({message: error});
    }
  }

}
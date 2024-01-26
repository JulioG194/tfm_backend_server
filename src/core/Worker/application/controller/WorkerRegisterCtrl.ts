import { Request, Response } from "express";
import { WorkerRegister } from "../useCases/WorkerRegister";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from '../../../types/HttpStatusCode';

export class WorkerRegisterController {
  constructor(private workerRegister: WorkerRegister) {}
  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
        const worker = await this.workerRegister.run({
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
        res.status(200).send(new HttpResponse('Información de trabajador registrada con éxito', HttpStatusCode.OK, worker));
    } catch(error: any){
      console.log(error)
        res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
    }
  }

}
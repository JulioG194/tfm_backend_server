import { Request, Response } from "express";
import { RecruiterRegister } from "../useCases/RecruiterRegister";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from '../../../types/HttpStatusCode';

export class RecruiterRegisterController {
  constructor(private recruiterRegister: RecruiterRegister) {}
  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
        const recruiter = await this.recruiterRegister.run({
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
          avatar: body.avatar
        });
        res.status(200).send(new HttpResponse('Información del reclutador registrada con éxito', HttpStatusCode.OK, recruiter));
    } catch(error: any){
      console.log(error)
        res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
    }
  }

}
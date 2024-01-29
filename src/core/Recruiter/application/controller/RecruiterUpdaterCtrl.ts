import { Request, Response } from "express";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { PersonBuilder } from "../../../utils/PersonBuilder";
import { RecruiterUpdater } from "../useCases"


export class RecruiterUpdaterController {
  constructor(private recruiterUpdater: RecruiterUpdater) {}
  public updaterCtrl = async ({ body }: Request, res: Response) => {
    try {
        const recruiter = await this.recruiterUpdater.run(PersonBuilder(body));
        res.status(200).send(new HttpResponse('Información del reclutador actualizada con éxito', HttpStatusCode.OK, recruiter));
    } catch(error: any){
      console.log(error)
        res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
    }
  }

}
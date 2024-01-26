import { Request, Response } from "express";
import { RecruiterGetter } from "../useCases";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from "../../../types/HttpStatusCode";

export class RecruiterGetterController {
    constructor(private recruiterGetter: RecruiterGetter) {}
    public getterCtrl = async ({ params: {id} }: Request, res: Response) => {
      try {
        const recruiter = await this.recruiterGetter.run({id});
        if (!recruiter) {
          return res.status(404).send(new HttpResponse('Reclutador no encontrado', HttpStatusCode.NOT_FOUND,null));
        }
        res.status(200).send(new HttpResponse('Información de reclutador obtenida con éxito', HttpStatusCode.OK, recruiter));
      } catch(error: any){
        console.log(error)
          res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
      }
    }
  
  }
import { Request, Response } from "express";
import { WorkerGetter } from "../useCases";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from "../../../types/HttpStatusCode";

export class WorkerGetterController {
    constructor(private workerGetter: WorkerGetter) {}
    public getterCtrl = async ({ params: {id} }: Request, res: Response) => {
      try {
        const worker = await this.workerGetter.run({id});
        if (!worker) {
          return res.status(404).send(new HttpResponse('Trabajador no encontrado', HttpStatusCode.NOT_FOUND,null));
        }
        res.status(200).send(new HttpResponse('Información de trabajador obtenida con éxito', HttpStatusCode.OK, worker));
      } catch(error: any){
        console.log(error)
          res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
      }
    }
  
  }
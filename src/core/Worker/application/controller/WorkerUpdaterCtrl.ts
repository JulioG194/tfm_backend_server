import { Request, Response } from "express";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { PersonBuilder } from "../../../utils/PersonBuilder";
import { WorkerUpdater } from "../useCases";

export class WorkerUpdaterController {
  constructor(private workerUpdater: WorkerUpdater) {}
  public updaterCtrl = async ({ body }: Request, res: Response) => {
    try {
        const worker = await this.workerUpdater.run(PersonBuilder(body));
        res.status(200).send(new HttpResponse('Información de trabajador actualizada con éxito', HttpStatusCode.OK, worker));
    } catch(error: any){
      console.log(error)
        res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
    }
  }

}
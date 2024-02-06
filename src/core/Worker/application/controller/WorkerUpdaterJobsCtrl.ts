import { Request, Response } from "express";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { PersonBuilder } from "../../../utils/PersonBuilder";
import { WorkerUpdaterJobs } from "../useCases";

export class WorkerUpdaterJobsController {
  constructor(private WorkerUpdaterjobs: WorkerUpdaterJobs) {}
  public updaterJobsCtrl = async ({ body }: Request, res: Response) => {
    try {
        const worker = await this.WorkerUpdaterjobs.run({
            email: body.email,
            jobs: body.jobs
        });
        res.status(200).send(new HttpResponse('Información de trabajados realizados, actualizada con éxito', HttpStatusCode.OK, worker));
    } catch(error: any){
      console.log(error)
        res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
    }
  }

}
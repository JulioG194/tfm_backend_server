import { Request, Response } from "express";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from "../../../types/HttpStatusCode";
import { WorkerGetterAll } from "../useCases/WrokerGetterAll";

export class WorkerGetterAllController {
    constructor(private workerGetterAll: WorkerGetterAll) {}
    public getterAllCtrl = async (req: Request, res: Response) => {
      try {
        const workers = await this.workerGetterAll.run();
        if (!workers || workers.length === 0) {
          return res.status(404).send(new HttpResponse('Trabajadores no encontrados', HttpStatusCode.NOT_FOUND,null));
        }
        res.status(200).send(new HttpResponse('Información de trabajadores obtenidas con éxito', HttpStatusCode.OK, workers));
      } catch(error: any){
        console.log(error)
          res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
      }
    }
  
  }
import { Request, Response } from "express";
import {  WorkerGetterWithEmail } from "../useCases";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from "../../../types/HttpStatusCode";

export class WorkerGetterWithEmailController {
    constructor(private workerGetter: WorkerGetterWithEmail) {}
    public getterCtrl = async ({ query: { email } }: Request, res: Response) => {
        console.log('email', email);
        if (!email || typeof email !== 'string') {
            return res.status(400).send(new HttpResponse('No se ha ingresado un correo', HttpStatusCode.NOT_FOUND,null));
        }
        
      try {
        console.log('email', email);
        const worker = await this.workerGetter.run({ email });
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
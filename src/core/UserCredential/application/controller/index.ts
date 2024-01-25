import { Request, Response } from "express";
import { UserCredentialRegister } from "../useCases";
import { HttpResponse } from "../../../types/Responses/HttpResponse";
import { HttpStatusCode } from "../../../types/HttpStatusCode";
import { BaseError } from "../../../types/Responses/BaseError";


export class UserCredentialController {
  constructor(private userCredentialRegister: UserCredentialRegister) {}
  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
        await this.userCredentialRegister.run({username: body.username, password: body.password, role: body.role, permissions: body.permissions});
        res.status(200).send(
          new HttpResponse('Usuario creado con éxito',HttpStatusCode.OK, null)
        );
    } catch(error: any){
        res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
    }
  }

}
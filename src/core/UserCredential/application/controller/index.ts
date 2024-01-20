import { Request, Response } from "express";
import { UserCredentialRegister } from "../useCases";

export class UserCredentialController {
  constructor(private userCredentialRegister: UserCredentialRegister) {}
  public registerCtrl = async ({ body }: Request, res: Response) => {
    try {
        await this.userCredentialRegister.run({username: body.username, password: body.password, role: body.role, permissions: body.permissions});
        res.status(200).send({ message: 'User registered sucessfully' });
    } catch(error){
        res.status(400).send({message: error});
    }
  }

}
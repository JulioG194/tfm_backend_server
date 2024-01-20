import { Request, Response } from "express";
import OAuthClientSchema from "../../infraestructure/models/OAuthClientSchema";

export class OAuthCredentialController {
    constructor() {
    }
  
    public registerClientCtrl = async ({ body }: Request, res: Response) => {
        const { redirectUris, grants, clientId:id, clientSecret } = body;
        const newClient = new OAuthClientSchema({
            id,  
            clientSecret,
            redirectUris,
            grants
        });
        try {
            await newClient.save();
            res.status(201).json({ id, clientSecret });
        } catch (error) {
            console.log('error', error);
            res.status(500).json({ message: 'Error al registrar el cliente' });
        }
    }
}
import OAuthServer from 'oauth2-server';
import oauth from '../oauth';
import { Request, Response } from 'express';

export class OAuthServerController {
    constructor() {}

    public authToken = async (req: Request, res: Response) => {
        const request = new OAuthServer.Request(req);
        const response = new OAuthServer.Response(res);
        try {
            const token = await oauth.token(request, response);
            res.status(200).json(token);
        } catch (error) {
            console.log('error', error);
            res.status(500).json({ message: 'Error al registrar el cliente' });
        }

    }
}
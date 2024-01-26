import OAuthServer from 'oauth2-server';
import oauth from '../oauth';
import { NextFunction, Request, Response } from 'express';
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { HttpResponse } from '../../../types/Responses/HttpResponse';

export class OAuthAuthenticateController {
    constructor() {}

    public authenticate = async (req: Request, res: Response, next: NextFunction) => {
        const request = new OAuthServer.Request(req);
        const response = new OAuthServer.Response(res);
        try {
            await oauth.authenticate(request, response);
            next();
        } catch (error: any) {
            console.log(error);
            if(error.inner){
                console.log('errorssssss', error.inner.name);
                res.status(400).json(new HttpResponse(error.inner.name, HttpStatusCode.BAD_REQUEST, null));
            } else {
                res.status(400).json(new HttpResponse('Error al validar token', HttpStatusCode.BAD_REQUEST, null));
            }
           
        }

    }
}
import OAuthServer from 'oauth2-server';
import oauth from '../oauth';
import { Request, Response } from 'express';
import { HttpStatusCode } from '../../../types/HttpStatusCode';
import { HttpResponse } from '../../../types/Responses/HttpResponse';

export class OAuthServerController {
    constructor() {}

    public authToken = async (req: Request, res: Response) => {
        const request = new OAuthServer.Request(req);
        const response = new OAuthServer.Response(res);
        try {
            const token = await oauth.token(request, response);
            const accessToken = {
                accessToken: token.accessToken,
                accessTokenExpiresAt: token.accessTokenExpiresAt,
                refreshToken: token.refreshToken,
                refreshTokenExpiresAt: token.refreshTokenExpiresAt,
                user: {
                    username: token.user.username,
                    role: token.user.role,
                    permissions: token.user.permissions
                }
            };
            res.status(200).json(new HttpResponse('Token obtenido con éxito', HttpStatusCode.OK, accessToken));
        } catch (error: any) {
            if(error.inner){
                console.log('errorssssss', error.inner.name);
                res.status(400).json(new HttpResponse(error.inner.name, HttpStatusCode.BAD_REQUEST, null));
            } else {
                res.status(400).json(new HttpResponse('Error al obtener token de acceso, revise las credenciales', HttpStatusCode.BAD_REQUEST, null));
            }
           
        }

    }
}
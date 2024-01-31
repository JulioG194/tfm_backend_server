import { Request, Response } from "express";
import { HttpResponse } from "../../types/Responses/HttpResponse";
import { HttpStatusCode } from "../../types/HttpStatusCode";

export class HomeController {
    constructor() {}
    public homeCtrl = async (req: Request, res: Response) => {
      try {
        res.status(200).send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>API Segura TFM v1.0</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              background-color: #f0f0f0;
              color: #333;
              text-align: center;
              padding-top: 50px;
            }
            h1 {
              color: #007bff;
            }
          </style>
        </head>
        <body>
          <h1>API Segura TFM v1.0</h1>
          <p>Bienvenido a la versión 1.0 de la API Segura para TFM.</p>
        </body>
        </html>
      `);
      } catch(error: any){
        console.log(error)
          res.status(400).send(new HttpResponse(error.name, HttpStatusCode.BAD_REQUEST, null));
      }
    }
  
  }
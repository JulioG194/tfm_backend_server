import express from 'express';
import { Request, Response } from "express";
import multer from 'multer';
import fs from 'fs';
import { Upload } from '@aws-sdk/lib-storage';
import { s3Client } from '../../../config/s3/config';
import { HttpResponse } from '../../types/Responses/HttpResponse';
import { HttpStatusCode } from '../../types/HttpStatusCode';
const upload = multer({ dest: 'uploads/' });
const route = express.Router();

route.post('/files', upload.single('file'), async (req: Request , res:Response ) => {
    const { file } = req;
    try {
        const parallelUploads3 = new Upload({
            client: s3Client,
            params: {
                Bucket: 'tfmbucketv1',
                Key: `users/${file!.originalname}`,
                Body: fs.createReadStream(file!.path),
                ContentType: file!.mimetype,
            },
        });
        const { Location: fileURL } = await parallelUploads3.done();
        res.status(200).json(new HttpResponse('Archivo subido con éxito', HttpStatusCode.OK, { fileURL }));
    } catch (error) {
        console.error('Error al subir a S3:', error);
        res.status(500).json(new HttpResponse('Error al subir a S3:', HttpStatusCode.INTERNAL_SERVER, null));
    } finally {
        fs.unlinkSync(file!.path);
    }
});


export default route;
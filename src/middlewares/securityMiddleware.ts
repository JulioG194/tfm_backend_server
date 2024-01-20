import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { NextFunction, Request, Response } from 'express';

const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
    helmet()(req, res, () => {
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100 
        });
        limiter(req, res, () => {
            hpp()(req, res, () => {
                cors()(req, res, () => {
                    next();
                });
            });
        });
    });
};

export default securityMiddleware;
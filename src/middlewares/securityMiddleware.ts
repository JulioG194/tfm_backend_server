import helmet from 'helmet';
import hpp from 'hpp';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { NextFunction, Request, Response } from 'express';

const securityMiddleware = (req: Request, res: Response, next: NextFunction) => {
    //res.setHeader('X-Frame-Options', 'SAMEORIGIN');
    //res.setHeader('X-Content-Type-Options', 'nosniff');
    //res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
    helmet({
        contentSecurityPolicy: {
            directives: {
                defaultSrc: ["'self'"],
                scriptSrc: ["'self'"],
            }
        }
    })(req, res, () => {
        const limiter = rateLimit({
            windowMs: 15 * 60 * 1000, 
            max: 100 
        });
        limiter(req, res, () => {
            hpp()(req, res, () => {
                cors({
                    origin: 'https://web.finaltfm.site',
                    credentials: true,
                })(req, res, () => {
                    next();
                });
            });
        });
    });
};

export default securityMiddleware;
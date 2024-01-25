
import { Request, Response, NextFunction } from 'express';
import { errorHandler } from '../core/shared/HandleError';

const handleErrorMiddleware = (async (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (!errorHandler.isTrustedError(err)) {
      next(err);
    }
    await errorHandler.handleError(err);
});

export default handleErrorMiddleware;
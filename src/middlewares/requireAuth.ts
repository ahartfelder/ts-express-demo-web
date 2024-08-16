import { Request, Response, NextFunction } from 'express';

export const requireAuth = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    if (req.session.username) {
      next();
    } else {
      throw new Error('Unauthorized');
    }
  } catch (error: any) {
    if (error.message === 'Unauthorized') error.statusCode = 401;
    next(error);
  }
};

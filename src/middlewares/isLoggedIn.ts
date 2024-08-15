import { NextFunction, Request, Response } from 'express';

export const isLoggedIn = (req: Request, res: Response, next: NextFunction) => {
  res.locals.isLoggedIn = !!req.session.username;
  next();
};

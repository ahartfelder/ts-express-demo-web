import { NextFunction, Request, Response } from 'express';

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  const locals = {
    title: '404 - Page not found',
  };
  res.status(404).render('404', locals);
  next();
};

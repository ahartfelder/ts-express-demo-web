import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
  code: string;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  let statusCode = err.statusCode ?? 500;
  let errorMessage = err.message ?? 'Internal Server Error';

  console.error(`\x1b[31m[ERROR] ${err.stack}\x1b[0m`);

  if (errorMessage === 'Invalid UUID format') errorMessage = 'Invalid user';

  if (err.code === 'EBADCSRFTOKEN') {
    statusCode = 403;
    errorMessage = '403 - Forbidden';
  }

  const locals = {
    title: errorMessage,
    isLoggedIn: req.session?.username,
  };

  res.status(statusCode).render(statusCode.toString(), locals);
};

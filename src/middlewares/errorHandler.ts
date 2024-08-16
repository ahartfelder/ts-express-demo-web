import { NextFunction, Request, Response } from 'express';

interface CustomError extends Error {
  statusCode?: number;
}

export const errorHandler = (
  err: CustomError,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const statusCode = err.statusCode ?? 500;
  let errorMessage = err.message ?? 'Internal Server Error';

  console.error(`\x1b[31m[ERROR] ${err.stack}\x1b[0m`);

  if (errorMessage === 'Invalid UUID format') errorMessage = 'Invalid user';

  const locals = {
    title: errorMessage,
  };

  res.render(statusCode.toString(), locals);
};

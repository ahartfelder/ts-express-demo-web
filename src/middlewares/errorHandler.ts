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

  console.error(`\x1b[31m[ERROR] ${err.stack}\x1b[0m`);

  if (err.message === 'Invalid UUID format') err.message = 'Invalid user';

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
};

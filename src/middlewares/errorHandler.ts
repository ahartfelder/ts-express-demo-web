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

  console.error(`[ERROR] ${err.stack}`);

  res.status(statusCode).json({
    status: statusCode,
    message: err.message || 'Internal Server Error',
  });
};

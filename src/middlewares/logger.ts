import { NextFunction, Request, Response } from 'express';

export const logger = (req: Request, res: Response, next: NextFunction) => {
  let color = { start: '\x1b[32m', end: '\x1b[0m' }; // Green, then Standard
  const start = Date.now();
  if (req.path.includes('favicon')) return next();

  console.log(
    `${color.start}[INFO] REQUEST: ${req.method} ${req.path}${color.end}`
  );

  res.on('finish', () => {
    const duration = Date.now() - start;
    const statusCode = res.statusCode;

    if (statusCode >= 400) {
      color.start = '\x1b[31m'; // Red
    } else if (statusCode >= 300 && statusCode < 400) {
      color.start = '\x1b[33m'; // Yellow
    }

    console.log(
      `${color.start}[INFO] RESPONSE: ${req.method} ${req.path} - ${res.statusCode} (${duration}ms)${color.end}\n`
    );
  });

  next();
};

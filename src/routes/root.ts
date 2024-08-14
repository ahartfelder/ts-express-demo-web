import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    res.send('Hello, TypeScript with Express and dotenv-flow!');
  } catch (error) {
    next(error);
  }
});

export default router;

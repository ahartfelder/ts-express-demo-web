import { Router, Request, Response } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express and dotenv-flow!');
});

export default router;

import { Router, Request, Response, NextFunction } from 'express';

const router = Router();

router.get('/', (req: Request, res: Response, next: NextFunction) => {
  try {
    const locals = {
      title: 'Welcome to Home Page',
    };
    res.render('home', locals);
  } catch (error) {
    next(error);
  }
});

export default router;

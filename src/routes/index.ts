import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import rootRouter from './root';
import { requireAuth } from '../middlewares/auth';
import { isLoggedIn } from '../middlewares/isLoggedIn';

const router = Router();

router.use(isLoggedIn);
router.use('/', rootRouter);
router.use('/auth', authRouter);
router.use('/users', requireAuth, userRouter);

export default router;

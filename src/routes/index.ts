import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import rootRouter from './root';
import { requireAuth } from '../middlewares/requireAuth';
import { isLoggedIn } from '../middlewares/isLoggedIn';
import { notFound } from '../middlewares/notFound';

const router = Router();

// cookie session already validated
router.use(isLoggedIn);

router.use('/', rootRouter);
router.use('/auth', authRouter);
router.use('/users', requireAuth, userRouter);
router.use(notFound);

export default router;

import { Router } from 'express';

import authRouter from './auth';
import userRouter from './user';
import rootRouter from './root';

const router = Router();

router.use('/', rootRouter);
router.use('/auth', authRouter);
router.use('/users', userRouter);

export default router;

import { Router } from 'express';
import {
  login,
  loginForm,
  logout,
  register,
  registerForm,
} from '../controllers/authController';

const router = Router();

router.route('/register').get(registerForm).post(register);
router.route('/login').get(loginForm).post(login);
router.get('/logout', logout);

export default router;

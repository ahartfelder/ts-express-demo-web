import { Request, Response, NextFunction } from 'express';

import { createUser, getUserByUsername } from '../db/queries/userQueries';
import { comparePassword, encryptPassword } from '../utils/bcrypt';

export const register = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const passwordHash = encryptPassword(password);
    const newUser = await createUser(username, passwordHash);
    console.log(newUser);
    req.session.username = username;
    res.redirect(`/users/${newUser.id}`);
  } catch (error) {
    next(error);
  }
};

export const login = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { username, password } = req.body;
    const user = await getUserByUsername(username);

    if (
      user &&
      user.password_hash &&
      comparePassword(password, user.password_hash)
    ) {
      req.session.username = username;
      res.redirect(`/users/${user.id}`);
      return;
    }
    res.status(401).send('Invalid username or password');
  } catch (error) {
    next(error);
  }
};

export const logout = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    req.session.destroy((err) => {
      if (err) {
        throw new Error('Could not log out.');
      } else {
        res.clearCookie('connect.sid');
        res.redirect('/');
      }
    });
  } catch (error: any) {
    if (error.message === 'Could not log out.') error.statusCode = 500;
    next(error);
  }
};

export const registerForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const locals = {
      title: 'Register',
      action: 'register',
    };
    res.render('register', locals);
  } catch (error) {
    next(error);
  }
};

export const loginForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const locals = {
      title: 'Login',
      action: 'login',
    };
    res.render('login', locals);
  } catch (error) {
    next(error);
  }
};

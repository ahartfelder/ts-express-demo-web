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
    res.status(201).send(`User ${username} registered`);
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
      // set session cookie
      res.status(200).send(`User ${username} logged in`);
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
    // Logout logic (e.g., destroy user session)
    res.status(200).send('User logged out');
  } catch (error) {
    next(error);
  }
};

export const registerForm = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.send('Register form');
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
    res.send('Login form');
  } catch (error) {
    next(error);
  }
};

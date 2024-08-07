import { Request, Response, NextFunction } from 'express';

export const register = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { username, password } = req.body;
    // Registration logic (e.g., save user to database)
    console.log(req.body);
    res.status(201).send(`User ${username} registered`);
  } catch (error) {
    res.status(400).send('Something went wrong!');
  }
};

export const login = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { username, password } = req.body;
    // Login logic (e.g., verify user credentials)
    console.log(req.body);
    res.status(200).send(`User ${username} logged in`);
  } catch (error) {
    res.status(400).send('Something went wrong!');
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
    res.status(400).send('Something went wrong!');
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
    res.status(400).send('Something went wrong!');
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
    res.status(400).send('Something went wrong!');
  }
};

import { Request, Response, NextFunction } from 'express';
import { validate as validateUUID } from 'uuid';
import { getUserById, listUsers } from '../db/queries/userQueries';
import { removePassword } from '../helpers/filterUser';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await listUsers();
    const locals = {
      title: 'Users List',
      users,
    };
    removePassword(users);
    res.render('users', locals);
  } catch (error) {
    next(error);
  }
};

export const getUser = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const { id } = req.params;
    if (!validateUUID(id)) throw new Error('Invalid UUID format');
    const user = await getUserById(id);
    if (!user) throw new Error('User not found');
    removePassword([user]);
    const locals = {
      title: `${user.username} details`,
      user,
    };
    res.render('user', locals);
  } catch (error: any) {
    if (error.message === 'Invalid UUID format') {
      error.statusCode = 400;
    } else if (error.message === 'User not found') {
      error.statusCode = 404;
    }
    next(error);
  }
};

export const createUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { username, password } = req.body;
    const newUser = { id: '1', username, password };
    res.status(201).json(newUser);
  } catch (error) {
    next(error);
  }
};

export const updateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.json('update user');
  } catch (error) {
    next(error);
  }
};

export const deleteUser = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    res.json('delete user');
  } catch (error) {
    next(error);
  }
};

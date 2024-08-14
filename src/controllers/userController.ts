import { Request, Response, NextFunction } from 'express';
import { getUserById, listUsers } from '../db/queries/userQueries';
import { removePassword } from '../helpers/filterUser';

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await listUsers();
    if (users.length) {
      removePassword(users);
      const locals = {
        title: 'Users List',
        users,
      };
      res.render('users', locals);
      return;
    }
    res.status(404).send('Users list empty');
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
    const user = await getUserById(id);
    if (user) {
      removePassword([user]);
      const locals = {
        title: `${user.username} details`,
        user,
      };
      res.render('user', locals);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
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
    const { id } = req.params;
    const { username, password } = req.body;
    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (userIndex !== -1) {
      users[userIndex] = { id: parseInt(id), username, password };
      res.json(users[userIndex]);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
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
    const { id } = req.params;
    const userIndex = users.findIndex((u) => u.id === parseInt(id));
    if (userIndex !== -1) {
      const deletedUser = users.splice(userIndex, 1);
      res.json(deletedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    next(error);
  }
};

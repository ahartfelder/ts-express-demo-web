import { Request, Response, NextFunction } from 'express';
import { listUsers } from '../db/queries/userQueries';

const users = [
  { id: 1, username: 'user1', password: 'password1' },
  { id: 2, username: 'user2', password: 'password2' },
];

export const getAllUsers = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  try {
    const users = await listUsers();
    if (users.length) {
      users.forEach((user) => {
        delete user.password_hash;
      });
      res.json(users);
      return;
    }
    res.status(404).send('Users list empty');
  } catch (error) {
    next(error);
  }
};

export const getUserById = (
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  try {
    const { id } = req.params;
    const user = users.find((u) => u.id === parseInt(id));
    if (user) {
      res.json(user);
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
    const newUser = { id: users.length + 1, username, password };
    users.push(newUser);
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

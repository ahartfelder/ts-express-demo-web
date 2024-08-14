import { User } from '../types';

export const removePassword = (users: User[]): void =>
  users.forEach((user) => delete user.password_hash);

import { User } from '../../types/index';
import { query } from '../pg';

export const getUserById = async (id: string): Promise<User> => {
  const text = 'SELECT * FROM users WHERE id = $1';
  const values = [id];
  const res = await query<User>(text, values);
  return res.rows[0];
};

export const getUserByUsername = async (username: string): Promise<User> => {
  const text = 'SELECT * FROM users WHERE username = $1';
  const values = [username];
  const res = await query<User>(text, values);
  return res.rows[0];
};

export const createUser = async (
  username: string,
  passwordHash: string
): Promise<User> => {
  const text =
    'INSERT INTO users (username, password_hash) VALUES ($1, $2) RETURNING *';
  const values = [username, passwordHash];
  const res = await query<User>(text, values);
  return res.rows[0];
};

export const listUsers = async (): Promise<User[]> => {
  const text = 'SELECT * FROM users';
  const res = await query<User>(text);
  return res.rows;
};

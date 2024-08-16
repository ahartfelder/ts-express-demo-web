import session from 'express-session';
import crypto from 'crypto';
import { config } from '../config';

export const cookieSession = session({
  secret: config.SESSION_SECRET || 'std-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
    sameSite: 'strict',
  },
  genid: () => crypto.randomBytes(16).toString('hex'),
  name: config.SESSION_NAME,
});

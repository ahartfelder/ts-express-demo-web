import session from 'express-session';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export const cookieSession = session({
  secret: process.env.SESSION_SECRET!,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 60 * 60 * 1000,
  },
});

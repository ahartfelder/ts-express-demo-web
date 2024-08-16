import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

export const config = {
  PORT: parseInt(process.env.PORT!) || 3000,
  POSTGRES_USER: process.env.POSTGRES_USER!,
  POSTGRES_HOST: process.env.POSTGRES_HOST!,
  POSTGRES_DB: process.env.POSTGRES_DB!,
  POSTGRES_PASSWORD: process.env.POSTGRES_PASSWORD!,
  POSTGRES_PORT: process.env.POSTGRES_PORT!,
  SESSION_SECRET: process.env.SESSION_NAME!,
  SESSION_NAME: process.env.SESSION_NAME!,
};

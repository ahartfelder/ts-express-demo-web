import 'express-session';

export interface User {
  id: string;
  username: string;
  password_hash?: string;
  created_at: Date;
}

declare module 'express-session' {
  interface SessionData {
    username?: string;
  }
}

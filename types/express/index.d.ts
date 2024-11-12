// types/express/index.d.ts
import 'express-session';
import { Session, SessionData } from 'express-session';

declare module 'express-session' {
  interface SessionData {
    username?: string;
    role?: string;
  }
}

declare global {
  namespace Express {
    interface Request {
      user?: { username: string; role: string };
      session: Session & Partial<SessionData>;
    }
  }
}

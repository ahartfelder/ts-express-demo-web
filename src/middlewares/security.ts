import { Express } from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import csurf from 'csurf';

export const security = (app: Express) => {
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 100,
    })
  );

  app.use(
    helmet({
      contentSecurityPolicy: {
        directives: {
          defaultSrc: ["'self'"],
          scriptSrc: ["'self'"],
          objectSrc: ["'none'"],
          upgradeInsecureRequests: [],
        },
      },
      frameguard: {
        action: 'deny',
      },
      xssFilter: true,
      noSniff: true,
      hsts: {
        maxAge: 31536000, // 1 year
        includeSubDomains: true,
        preload: true,
      },
      referrerPolicy: {
        policy: 'no-referrer',
      },
    })
  );

  app.use(csurf({ cookie: true }));
};

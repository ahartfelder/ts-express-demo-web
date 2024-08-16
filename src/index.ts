import path from 'path';
import express from 'express';
import expressLayouts from 'express-ejs-layouts';
import cookieParser from 'cookie-parser';

import routes from './routes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import { cookieSession } from './utils/cookieSession';
import { config } from './config/index';
import { security } from './middlewares/security';

const app = express();
const port = config.PORT;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, '../public')));

app.use(cookieSession);

security(app);

app.use(logger);

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

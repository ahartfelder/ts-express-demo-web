import path from 'path';
import express from 'express';
import dotenvFlow from 'dotenv-flow';
import expressLayouts from 'express-ejs-layouts';

import routes from './routes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';
import { cookieSession } from './utils/cookieSession';

dotenvFlow.config();

const app = express();
const port = process.env.PORT || 3000;

app.set('views', path.join(__dirname, './views'));
app.set('view engine', 'ejs');
app.set('layout', 'layouts/main');

app.use(expressLayouts);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(express.static('public'));

app.use(cookieSession);

app.use(logger);

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express from 'express';
import dotenvFlow from 'dotenv-flow';

import routes from './routes';
import { logger } from './middlewares/logger';
import { errorHandler } from './middlewares/errorHandler';

dotenvFlow.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(logger);

app.use(routes);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

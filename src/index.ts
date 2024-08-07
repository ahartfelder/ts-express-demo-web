import express from 'express';
import dotenvFlow from 'dotenv-flow';

import routes from './routes';

dotenvFlow.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(routes);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

import express, { Request, Response } from 'express';
import dotenvFlow from 'dotenv-flow';

dotenvFlow.config();

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

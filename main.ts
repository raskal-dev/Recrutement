import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { ConnectionDb } from './src/Models';
import userRouter from './src/Routes/User.routes';
import bodyParser from 'body-parser';


//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(express.json());

ConnectionDb();

/**
 * Call The Router
 */
const groupEndpoint = '/api';
app.use(`${groupEndpoint}/users`, userRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  console.log(`Server is Fire at http://localhost:${port}`);
});
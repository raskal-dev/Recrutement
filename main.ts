import express, { Request, Response , Application } from 'express';
import dotenv from 'dotenv';
import { ConnectionDb } from './src/Models';
import userRouter from './src/Routes/User.routes';
import bodyParser from 'body-parser';
import offerRouter from './src/Routes/Offer.routes';
import competenceRouter from './src/Routes/Competence.routes';
import baseLogger from 'morgan';
import logger from './src/Configs/Logger.config';
// import moment from 'moment';

//For env File 
dotenv.config();

const app: Application = express();
const port = process.env.PORT || 5000;
app.use(bodyParser.json());
app.use(express.json());
// app.use(morgan(":method : :url :status :res[content-length] ................. :response-time ms"));
app.use(baseLogger('dev'));

ConnectionDb();

/**
 * Call The Router
 */
const groupEndpoint = '/api';
app.use(`${groupEndpoint}/users`, userRouter);
app.use(`${groupEndpoint}/offers`, offerRouter);
app.use(`${groupEndpoint}/competences`, competenceRouter);

app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Express & TypeScript Server');
});

app.listen(port, () => {
  // const formattedTime = moment().format('HH:mm:ss');
  // console.info(`[INFO] ${formattedTime} Server is Fire at http://localhost:${port}`);
  logger.info(`Server is running at http://localhost:${port}`);
});
import express from 'express';
import { store, userAll } from '../Controllers/User.controller';


const userRouter = express.Router();

userRouter.get('/', userAll);
userRouter.post('/', store);

export default userRouter;
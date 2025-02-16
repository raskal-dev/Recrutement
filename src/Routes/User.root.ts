import express from 'express';
import { store, update, userAll } from '../Controllers/User.controller';


const userRouter = express.Router();

userRouter.get('/', userAll);
userRouter.post('/', store);
userRouter.put('/:user', update);

export default userRouter;
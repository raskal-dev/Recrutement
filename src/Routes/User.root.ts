import express from 'express';
import { createUserController, deleteUserController, getUsersController, updateUserController } from '../Controllers/User.controller';


const userRouter = express.Router();

userRouter.get('/', getUsersController);
userRouter.post('/', createUserController);
userRouter.put('/:user', updateUserController);
userRouter.delete('/:userId', deleteUserController);

export default userRouter;
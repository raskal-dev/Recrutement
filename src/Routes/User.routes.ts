import express from 'express';
import { createUserController, deleteUserController, getUserController, getUsersController, loginController, updateUserController } from '../Controllers/User.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';


const userRouter = express.Router();

userRouter.get('/', jwtMiddleware, getUsersController);
userRouter.get('/:userId', jwtMiddleware, getUserController);
userRouter.post('/', createUserController);
userRouter.put('/:userId', updateUserController);
userRouter.delete('/:userId', deleteUserController);
userRouter.post('/login', loginController);

export default userRouter;
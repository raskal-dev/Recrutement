import express from 'express';
import { createUserController, deleteUserController, getUsersController, loginController, logoutController, updateUserController } from '../Controllers/User.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';


const userRouter = express.Router();

userRouter.get('/', jwtMiddleware, getUsersController);
userRouter.post('/', createUserController);
userRouter.put('/:user', updateUserController);
userRouter.delete('/:userId', deleteUserController);
userRouter.post('/login', loginController);
userRouter.post('/logout', jwtMiddleware, logoutController);

export default userRouter;
import express from 'express';
import { addCompetenceToUserController, createUserController, deleteUserController, getProfileController, getUserController, getUsersController, loginController, updateUserController } from '../Controllers/User.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';


const userRouter = express.Router();

userRouter.get('/', jwtMiddleware, getUsersController);
userRouter.get('/profile', jwtMiddleware, getProfileController);
userRouter.get('/:userId', jwtMiddleware, getUserController);
userRouter.post('/', createUserController);
userRouter.put('/:userId', jwtMiddleware, updateUserController);
userRouter.delete('/:userId', jwtMiddleware, deleteUserController);
userRouter.post('/login', loginController);
userRouter.post('/competences', jwtMiddleware, addCompetenceToUserController);

export default userRouter;
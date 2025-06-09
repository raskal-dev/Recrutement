import express from 'express';
import { addCompetenceToUserController, createUserController, deleteUserController, getProfileController, getUserController, getUsersController, loginController, updateUserController } from '../Controllers/User.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';
import { Role } from '../Utils/Enums/Role.enum';


const userRouter = express.Router();
const role = [Role.STUDENT];

userRouter.get('/', jwtMiddleware(role), getUsersController);
userRouter.get('/profile', jwtMiddleware(role), getProfileController);
userRouter.get('/:userId', jwtMiddleware(role), getUserController);
userRouter.post('/', createUserController);
userRouter.put('/:userId', jwtMiddleware(role), updateUserController);
userRouter.delete('/:userId', jwtMiddleware(role), deleteUserController);
userRouter.post('/login', loginController);
userRouter.post('/competences', jwtMiddleware(role), addCompetenceToUserController);

export default userRouter;
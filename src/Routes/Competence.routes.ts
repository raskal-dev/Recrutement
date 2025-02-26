import express from 'express';
import { getCompetencesController } from '../Controllers/Competence.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';
import { Role } from '../Utils/Enums/Role.enum';

const competenceRouter = express.Router();
const role = [Role.STUDENT];

competenceRouter.get('/', jwtMiddleware(role), getCompetencesController);

export default competenceRouter;
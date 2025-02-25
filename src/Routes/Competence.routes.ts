import express from 'express';
import { getCompetencesController } from '../Controllers/Competence.controller';
import { jwtMiddleware } from '../Middlewares/jwtMiddleware';

const competenceRouter = express.Router();

competenceRouter.get('/', jwtMiddleware, getCompetencesController);

export default competenceRouter;
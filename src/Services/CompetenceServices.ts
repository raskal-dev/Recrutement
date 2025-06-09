import { db } from "../Models";

const Competence = db.competences as any;

export const getCompetences = async () => {
    return await Competence.findAll();
};
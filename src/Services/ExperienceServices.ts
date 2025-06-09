import { db } from "../Models";
import { BaseError } from "../Utils/BaseErrer";
import { IExperience } from "../Utils/Interface/IExperience";

const Experience = db.experiences as any;

export const getExperiences = async () => {
    return await Experience.findAll();
};

export const getExperience = async (id: number) => {
    const existingExperience = await Experience.findByPk(id);
    if (!existingExperience) {
        throw new BaseError("Experience not found", 404);
    }

    return await Experience.findByPk(id);
};

export const createExperience = async (experience: IExperience) => {
    return await Experience.create(experience);
};
import { db } from "../src/Models";
import { createUser } from "../src/Services/UserServices";
import { Role } from "../src/Utils/Enums/Role.enum";
import { IUser } from "../src/Utils/Interface/IUser";


jest.mock("../src/Models", () => {
    const createMock = jest.fn();
    return {
        db: {
            users: {
                create: createMock
            }
        }
    };
});

describe('UserServices - createUser', () => {
        it('should create a user', async () => {
        const mockUser = {
        name: 'Kalvin',
        email: 'kalvin@example.com',
        adress: '123 Main St',
        about: 'A brief description about Kalvin.',
        password: 'hashedpass',
        role: Role.STUDENT,
        createdAt: new Date(),
        updatedAt: new Date(),
        };

        const expectedUser  = { ...mockUser };

        (db.users.create as jest.Mock).mockResolvedValue(expectedUser);

        const result = await createUser(mockUser);

        expect(db.users.create).toHaveBeenCalledWith(mockUser);
        expect(result).toEqual(expectedUser);
    });
});
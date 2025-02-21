import { Sequelize, DataTypes } from 'sequelize';
import { Role } from '../Utils/Enums/Role.enum';

const User = (sequelize: Sequelize) => {
    return sequelize.define(
        'User',
        {
            name: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            about: {
                type: DataTypes.STRING
            },
            adress: {
                type: DataTypes.STRING
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
            },
            role: {
                type: DataTypes.STRING(25),
                allowNull: false,
                defaultValue: Role.STUDENT,
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            timestamps: true,
        }
    );
}
export default User;
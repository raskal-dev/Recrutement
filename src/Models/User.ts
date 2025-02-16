import { Sequelize, DataTypes } from 'sequelize';

const User = (sequelize: Sequelize) => {
    return sequelize.define(
        'User',
        {
            firstName: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(100),
                allowNull: false,
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
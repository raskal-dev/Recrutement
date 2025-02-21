import { DataTypes, Sequelize } from "sequelize";

const Offer = (sequelize: Sequelize, ) => {
    return sequelize.define(
        'Offer',
        {
            title: {
                type: DataTypes.STRING(80),
                allowNull: false,
            },
            description: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            salary: {
                type: DataTypes.STRING(25),
                allowNull: false,
            },
            localisation: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            contract: {
                type: DataTypes.STRING,
                allowNull: false,
            }
        }, {
            timestamps: true,
        }
    );
}

export default Offer;
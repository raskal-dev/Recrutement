import { DataTypes, Sequelize } from "sequelize";

const Competence = (sequelize: Sequelize) => {
    return sequelize.define(
        'Competence',
        {
            name: {
                type: DataTypes.STRING(200),
                allowNull: false,
            }
        }, {
            timestamps: true,
        }
    );
}

export default Competence;
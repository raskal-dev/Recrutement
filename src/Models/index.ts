import { Sequelize } from "sequelize";
import DbConfig from "../Configs/Db.config";
import User from "./User";
import Offer from "./Offer";
import Competence from "./Competence";
import UserCompetence from "./UserCompetence";
import moment from "moment";
// import CompetencesSeeder from "../Seeders/CompetencesSeeder";


const sequelize = new Sequelize(DbConfig.DB, DbConfig.USER, DbConfig.PASSWORD, {
    host: DbConfig.HOST,
    dialect: DbConfig.dialect,
    logging: false, // Désactiver l'affichage des requêtes SQL
  
    pool: {
      max: DbConfig.pool.max,
      min: DbConfig.pool.min,
      acquire: DbConfig.pool.acquire,
      idle: DbConfig.pool.idle
    }
  });

const db = {} as any;

db.Sequelize = Sequelize;
db.sequelize = sequelize;

/**
 * call the models
 */

db.users = User(sequelize);
db.offers = Offer(sequelize);
db.competences = Competence(sequelize)
db.userCompetences = UserCompetence(sequelize);

/**
 * Define the R E L A T I O N S H I P S
 */
db.users.hasMany(db.offers);
db.offers.belongsTo(db.users);
db.users.belongsToMany(db.competences, { through: 'UserCompetences' });
db.competences.belongsToMany(db.users, { through: 'UserCompetences' });

/**
 * Call the seeders
 */
// const runSeeder = async () => {
//     try {
//         await CompetencesSeeder.up(sequelize.getQueryInterface());
//         console.log("✅ Seeders exécutés avec succès !");
//     } catch (error) {
//         console.error("❌ Erreur lors de l'exécution des seeders :", error);
//     } finally {
//         await sequelize.close();
//     }
// }


const ConnectionDb = async () => {
  const formattedTime = moment().format('HH:mm:ss');
    try {
        await db.sequelize.sync({  force: false, alter: true});
        console.info(`[INFO] ${formattedTime} Base de données synchronisée avec succès !`);
    } catch (err: any) {
        console.log(`[WARN] ${formattedTime} Échec de la synchronisation de la base de données :`, err.message);
    }
}

export { ConnectionDb, db };
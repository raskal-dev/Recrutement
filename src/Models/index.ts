import { Sequelize } from "sequelize";
import DbConfig from "../Configs/Db.config";
import User from "./User";
import Offer from "./Offer";


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

/**
 * Define the R E L A T I O N S H I P S
 */
db.users.hasMany(db.offers);
db.offers.belongsTo(db.users);


const ConnectionDb = async () => {
    try {
        await db.sequelize.sync({  force: false, alter: true});
        console.log("Synced db.");
    } catch (err: any) {
        console.log("Failed to sync db: " + err.message);
    }
}

export { ConnectionDb, db };
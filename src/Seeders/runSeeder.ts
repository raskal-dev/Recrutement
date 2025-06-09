import { db } from "../Models";
import CompetencesSeeder from "./CompetencesSeeder";
const sequelize = db.sequelize;

const runSeeder = async () => {
    try {
        await CompetencesSeeder.up(sequelize.getQueryInterface());
        console.log("✅ Seeders exécutés avec succès !");
    } catch (error) {
        console.error("❌ Erreur lors de l'exécution des seeders :", error);
    } finally {
        await sequelize.close();
    }
}

runSeeder();
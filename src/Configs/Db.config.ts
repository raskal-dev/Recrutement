import dotenv from 'dotenv';

dotenv.config();

const DbConfig: any = {
  HOST: process.env.DB_HOST ?? "localhost",
  PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
  USER: process.env.DB_USER || "",
  PASSWORD: process.env.DB_PASSWORD,
  DB: process.env.DB_DATABASE,
  dialect: process.env.DB_DIALECT,
  pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
  }
};

export default DbConfig;
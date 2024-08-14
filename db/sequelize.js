import { Sequelize } from "sequelize";

const {
  DATABASE_DIALECT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;

export const databaseConfig = {
  dialect: DATABASE_DIALECT,
  database: DATABASE_NAME,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  host: DATABASE_HOST,
  port: DATABASE_PORT,
  dialectOptions: {
    ssl: true,
  },
};

const sequelize = new Sequelize(databaseConfig);

export default sequelize;

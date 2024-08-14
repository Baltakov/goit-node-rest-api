import { Sequelize } from "sequelize";

// export const sequelize = new Sequelize({
//   dialect: "postgres",
//   username: "kostiantyn",
//   database: "db_contacts_i6lh",
//   password: "4H2mEISW5x1BioEgG2H9MCMEzvfIyTMv",
//   host: "dpg-cqqtigt6l47c73b2hk90-a.frankfurt-postgres.render.com",
//   port: "5432",
//   dialectOptions: {
//     ssl: true,
//   },
// });
const {
  DATABASE_DIALECT,
  DATABASE_NAME,
  DATABASE_USER,
  DATABASE_PASSWORD,
  DATABASE_HOST,
  DATABASE_PORT,
} = process.env;
console.log(DATABASE_DIALECT);

const databaseConfig = {
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

export const sequelize = new Sequelize(databaseConfig);

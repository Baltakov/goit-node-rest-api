import { Sequelize } from "sequelize";

export const sequelize = new Sequelize({
  dialect: "postgres",
  username: "kostiantyn",
  database: "db_contacts_i6lh",
  password: "4H2mEISW5x1BioEgG2H9MCMEzvfIyTMv",
  host: "dpg-cqqtigt6l47c73b2hk90-a.frankfurt-postgres.render.com",
  port: "5432",
  dialectOptions: {
    ssl: true,
  },
});

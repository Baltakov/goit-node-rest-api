import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Contact = sequelize.define("contact", {
  id: DataTypes.STRING,
  name: DataTypes.STRING,
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
});

export default Contact;

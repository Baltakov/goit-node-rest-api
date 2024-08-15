import { DataTypes } from "sequelize";

import sequelize from "../sequelize.js";

const Contact = sequelize.define("contact", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: DataTypes.STRING,
  phone: DataTypes.STRING,
});

// Contact.sync();

export default Contact;

const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database/config/database");

const Employee = sequelize.define("Employee", {
  imagePath: {
    type: DataTypes.STRING,
  },
});

module.exports = Employee;

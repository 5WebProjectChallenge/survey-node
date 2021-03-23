"use strict";
const dotenv = require("dotenv");
dotenv.config();
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const db = {};

console.log(process.env.DB_NAME);

const sequelize = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PASSWORD,
  {
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres" /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  }
);

try {
  sequelize.authenticate();
} catch (e) {
  console.log("Failed building connection");
  console.log(e);
  console.log("Fin");
}

// This will run .sync() only if database name ends with '_test123'
// sequelize.sync({ force: false, match: /_test123$/ });
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js"
    );
  })
  .forEach((file) => {
    const model = sequelize["import"](path.join(__dirname, file));
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});
db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

// backend/models/index.js
// Server-side entry point for the database models
// Initializes Sequelize and imports all models

// Impose stricter parsing and error handling
"use strict";

// Import required modules
const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const process = require("process");

// Exclude the current file from the list of models
const basename = path.basename(__filename);

// Initialize Sequelize and load configuration
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

// Initialize database object
const db = {};

// Initialize Sequelize instance
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    config
  );
}

// Sync database tables in development environment
if ("development" === env) {
  sequelize
    .sync({ alter: true })
    .then(() => {
      console.log("All tables are up to date");
    })
    .catch((error) => {
      console.error("Failed to sync database:", error);
    });
}

// Load all models from the current directory
fs.readdirSync(__dirname)
  .filter((file) => {
    return (
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.slice(-3) === ".js" &&
      file.indexOf(".test.js") === -1
    );
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(
      sequelize,
      Sequelize.DataTypes
    );
    db[model.name] = model;
  });

// Set up model associations
Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Export Sequelize and models
db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Remove the code that reads models from files
// fs
//   .readdirSync(__dirname)
//   .filter(file => {
//     return (
//       file.indexOf('.') !== 0 &&
//       file !== basename &&
//       file.slice(-3) === '.js' &&
//       file.indexOf('.test.js') === -1
//     );
//   })
//   .forEach(file => {
//     const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
//     db[model.name] = model;
//   });

// Define your User model
const User = sequelize.define('User', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true
  }
});

// Add your User model to the db object
db['User'] = User;

// Optionally, you can define associations here if needed

// Sync all defined models to the database
// This will create tables if they don't exist
sequelize.sync({ force: false }) // Set force to true to drop tables on every sync
  .then(() => {
    console.log('All models were synchronized successfully.');
  })
  .catch(err => {
    console.error('Error synchronizing models:', err);
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;

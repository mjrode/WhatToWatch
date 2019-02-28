import fs from 'fs';
import path from 'path';
import Sequelize from 'sequelize';
import configs from '../config/config';

const basename = path.basename(__filename);
// istanbul ignore next
const env = process.env.NODE_ENV || 'development';
const config = configs[env];
const capitalize = string => string[0].toUpperCase() + string.slice(1);

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    ...config,
    operatorsAliases: false,
    logging: false,
  },
);

const db = fs
  .readdirSync(__dirname)
  .filter(
    file =>
      file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js',
  )
  .reduce(
    (acc, file) => {
      const model = sequelize.import(path.join(__dirname, file));
      acc[capitalize(model.name)] = model;
      return acc;
    },
    {sequelize, Sequelize},
  );

Object.keys(db).forEach(modelName => {
  // istanbul ignore next
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

// Syntax required to destructure models off of exported db
module.exports = db;

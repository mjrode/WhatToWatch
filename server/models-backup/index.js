import Sequelize from 'sequelize';
import fs from 'fs';
import path from 'path';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost',
    logging: false,
    operatorsAliases: false,
  },
);

const basename = path.basename(module.filename);
const db = {Sequelize, sequelize};
const onlyModels = file =>
  file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
const importModel = file => {
  const modelPath = path.join(__dirname, file);
  const model = sequelize.import(modelPath);
  db[model.name] = model;
};
const associate = modelName => {
  if (typeof db[modelName].associate === 'function')
    db[modelName].associate(db);
};
fs.readdirSync(__dirname)
  .filter(onlyModels)
  .forEach(importModel);

Object.keys(db).forEach(associate);

module.exports = db;
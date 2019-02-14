import Sequelize from 'sequelize';

const sequelize = new Sequelize(
  process.env.DATABASE,
  process.env.DATABASE_USER,
  process.env.DATABASE_PASSWORD,
  {
    dialect: 'postgres',
    host: 'localhost',
  },
  console.log(process.env.DATABASE),
);

const models = {
  User: sequelize.import('./user'),
  PlexLibrary: sequelize.import('./plexLibrary'),
  PlexSection: sequelize.import('./plexSection'),
};

Object.keys(models).forEach(key => {
  if ('associate' in models[key]) {
    models[key].associate(models);
  }
});

export {sequelize};

export default models;

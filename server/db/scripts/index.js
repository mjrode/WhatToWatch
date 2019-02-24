// @ts-nocheck
/* istanbul ignore file */
import {exec} from 'child_process';
import models from '../models';
import seeds from '../seeders';
import {test as config} from '../config/config';

const {username, host, database} = config;

const EXIT_CODE = 168;

const migrate = () =>
  new Promise((resolve, reject) => {
    exec(
      './node_modules/.bin/sequelize db:migrate --env test',
      (err, stdout) => {
        if (err) {
          console.log('Error migrating DB.');
          reject(EXIT_CODE);
        } else {
          console.log(stdout);
          resolve();
        }
      },
    );
  });

const createDB = () =>
  new Promise((resolve, reject) => {
    exec(
      `createdb -U ${username} -h ${host} ${database}`,
      (err, stdout, stderr) => {
        if (err || stderr) {
          console.log('Error creating DB');
          console.log(err || stderr);
          reject(EXIT_CODE);
        } else {
          console.log('Created DB.');
          resolve();
        }
      },
    );
  });

const dropDB = () =>
  new Promise((resolve, reject) => {
    exec(
      `dropdb -U ${username} -h ${host} ${database}`,
      (err, stdout2, stderr) => {
        if (err || stderr) {
          console.log('Error dropping DB');
          console.log(err || stderr);
          reject(EXIT_CODE);
        } else {
          console.log('Dropped DB.');
          resolve();
        }
      },
    );
  });

const unmigrate = () =>
  new Promise((resolve, reject) => {
    exec(
      './node_modules/.bin/sequelize db:migrate:undo:all --env test',
      (err, stdout) => {
        if (err) {
          console.log('Error unmigrating DB.');
          reject(EXIT_CODE);
        } else {
          console.log(stdout);
          resolve();
        }
      },
    );
  });

const cleanUp = () =>
  unmigrate()
    .then(() => models.sequelize.close())
    .then(dropDB);

const init = () =>
  createDB()
    .catch(() => dropDB().then(createDB))
    .then(migrate);

const truncate = model =>
  models[model]
    .destroy({
      where: {},
      force: true,
      paranoid: false,
    })
    .catch(() => {
      console.log('Error truncating', model);
      process.exit(EXIT_CODE);
    });

const seed = (model, collection = model) => {
  const seedForModel = seeds[collection];
  return models[model].bulkCreate(seedForModel).catch(err => {
    console.log(err);
    console.log('Error seeding', model);
    process.exit(EXIT_CODE);
  });
};

export {init, truncate, seed, cleanUp};

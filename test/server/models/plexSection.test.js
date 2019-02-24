import plexSection from '../../../server/models/plexSection';

const {
  sequelize,
  dataTypes,
  checkModelName,
  checkPropertyExists,
} = require('sequelize-test-helpers');

describe('server/models/plexSection', () => {
  const Model = plexSection(sequelize, dataTypes);
  const instance = new Model();

  checkModelName(Model)('plex_section');
  context('properties', () => {
    ['title', 'type', 'key', 'userId'].forEach(checkPropertyExists(instance));
  });
});

import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';
import importData from '../../../../server/services/plex/importData';
import models from '../../../../server/db/models';
import { seed, truncate } from '../../../../server/db/scripts';
import * as nocks from '../../../nocks';

describe('ImportData', () => {
  before(async () => {
    await truncate('User');
    await truncate('PlexLibrary');
    await truncate('PlexSection');
    await seed('User', 'Users');
    await seed('PlexSection');
    await seed('PlexSection', 'PlexSections');
    await seed('PlexLibrary');
  });
  after(() => {});

  describe('GET /plex/import/sections', () => {
    it('should find and store sections in the database for the user that is passed in', async () => {
      nocks.plexSections();

      const user = await models.User.findOne({
        where: { googleId: '101111197386111111151' },
      });

      const sectionsBeforeUpdate = await models.PlexSection.findOne({
        where: {
          UserId: 1,
          type: 'show',
          title: 'TV Shows',
        },
      });

      sectionsBeforeUpdate.dataValues.title.should.eq('TV Shows');
      sectionsBeforeUpdate.dataValues.type.should.eq('show');
      sectionsBeforeUpdate.dataValues.key.should.eq(4);

      await importData.importSections(user);
      const sections = await models.PlexSection.findAll();

      const movies = sections.filter(
        data =>
          data.dataValues.title === 'Movies' &&
          data.dataValues.UserId === user.id,
      );

      movies[0].dataValues.title.should.eq('Movies');
      movies[0].dataValues.type.should.eq('movie User 1');
      movies[0].dataValues.key.should.eq(2);

      const tvShows = sections.filter(
        data =>
          data.dataValues.title === 'TV Shows' &&
          data.dataValues.UserId === user.id,
      );
      tvShows[0].dataValues.title.should.eq('TV Shows');
      tvShows[0].dataValues.type.should.eq('show User 1');
      tvShows[0].dataValues.key.should.eq(3);

      sections.should.be.length(4);
    });
  });

  describe('GET /plex/import/libraries', () => {
    it('should find and store libraries in the database for the user that is passed in', async () => {
      const libraryBeforeImport = await models.PlexLibrary.findAll();
      libraryBeforeImport.should.be.length(10);

      const user = await models.User.findOne({
        where: { googleId: '101111197386111111151' },
      });

      const movieBeforeUpdate = await models.PlexLibrary.findOne({
        where: {
          title: 'Big Time in Hollywood, FL',
          UserId: 1,
        },
      });

      movieBeforeUpdate.dataValues.title.should.eq(
        'Big Time in Hollywood, FL',
      );
      movieBeforeUpdate.dataValues.type.should.eq(
        'show before import',
      );

      const testUserLibrary = await models.PlexLibrary.findAll({
        where: { UserId: 999 },
      });

      testUserLibrary.should.be.length(9);

      nocks.plexSections();
      nocks.plexLibrary();
      await importData.importLibraries(user);
      const library = await models.PlexLibrary.findAll();
      library.should.be.length(65);

      nocks.plexSections();
      nocks.plexLibrary();
      await importData.importLibraries(user);
      const librarySecondRequest = await models.PlexLibrary.findAll();
      librarySecondRequest.should.be.length(65);

      const movieAfterUpdate = await models.PlexLibrary.findOne({
        where: {
          title: 'Big Time in Hollywood, FL',
          UserId: 1,
        },
      });

      movieAfterUpdate.dataValues.title.should.eq(
        'Big Time in Hollywood, FL',
      );
      movieAfterUpdate.dataValues.type.should.eq('show');

      const testUserLibraryAfterImport = await models.PlexLibrary.findAll(
        {
          where: { UserId: 999 },
        },
      );

      testUserLibraryAfterImport.should.be.length(9);
    });
  });

  describe('GET /plex/import/most-watched', () => {
    it('should find and store libraries in the database', async () => {
      const user = await models.User.findOne({
        where: { googleId: '101111197386111111151' },
      });

      nocks.plexSections();
      nocks.plexLibrary();
      await importData.importLibraries(user);
      const library = await models.PlexLibrary.findAll();
      library.should.be.length(65);

      nocks.mostWatched();
      await importData.importMostWatched(user);
      const newGirl = await models.PlexLibrary.findOne({
        where: { UserId: user.id, title: 'New Girl' },
      });
      newGirl.dataValues.views.should.eq(74);
      library.should.be.length(65);
    });
  });
});

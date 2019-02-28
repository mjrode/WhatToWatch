import chai from 'chai';
import nock from 'nock';
import app from '../../../../index';
import importData from '../../../../server/services/plex/importData';
import models from '../../../../server/db/models';
import { seed, truncate } from '../../../../server/db/scripts';
import * as nocks from '../../../nocks';

describe('ImportData', () => {
  before(() => {
    truncate('User');
    seed('User');
  });
  after(() => {
    truncate('User');
    truncate('PlexLibrary');
    truncate('PlexSection');
  });

  describe('GET /plex/import/sections', () => {
    it('should find and store sections in the database', async () => {
      nocks.plexSections();
      await importData.importSections();
      const sections = await models.PlexSection.findAll();
      const movies = sections.filter(
        data => data.dataValues.title === 'Movies',
      );
      movies[0].dataValues.title.should.eq('Movies');
      movies[0].dataValues.type.should.eq('movie');
      movies[0].dataValues.key.should.eq(2);

      const tvShows = sections.filter(
        data => data.dataValues.title === 'TV Shows',
      );
      tvShows[0].dataValues.title.should.eq('TV Shows');
      tvShows[0].dataValues.type.should.eq('show');
      tvShows[0].dataValues.key.should.eq(3);

      sections.should.be.length(2);
    });
  });

  describe('GET /plex/import/libraries', () => {
    it('should find and store libraries in the database', async () => {
      nocks.plexSections();
      nocks.plexLibrary();
      await importData.importLibraries();
      const library = await models.PlexLibrary.findAll();
      library.should.be.length(56);

      nocks.plexSections();
      nocks.plexLibrary();
      await importData.importLibraries();
      const librarySecondRequest = await models.PlexLibrary.findAll();
      librarySecondRequest.should.be.length(56);
    });
  });

  describe('GET /plex/import/most-watched', () => {
    it('should find and store libraries in the database', async () => {
      nocks.plexSections();
      nocks.plexLibrary();
      await importData.importLibraries();
      const library = await models.PlexLibrary.findAll();
      library.should.be.length(56);

      nocks.mostWatched();
      nocks.mostWatched();

      await importData.importMostWatched();
      const libraryMostWatched = await models.PlexLibrary.findAll();
      const newGirl = libraryMostWatched.filter(
        data => data.dataValues.title === 'New Girl',
      );
      newGirl[0].dataValues.views.should.eq(74);
      newGirl[0].dataValues.metadata_path.should.eq(
        '/library/metadata/5485/children',
      );
      libraryMostWatched.should.be.length(56);
    });
  });
});

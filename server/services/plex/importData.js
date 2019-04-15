import Promise from 'bluebird';
import plexApi from './plexApi';
import models from '../../db/models';
import config from '../../../config';
import MovieDb from 'moviedb-promise';
import {Op} from 'sequelize';
const mdb = new MovieDb(config.server.movieApiKey);

const importSections = async user => {
  const sections = await plexApi.getSections(user);
  const dbSections = await createSections(sections, user);
  return dbSections;
};

const importTvPosters = async user => {
  try {
    const mostWatched = await models.PlexLibrary.findAll({
      where: {UserId: user.id, type: 'show', views: {[Op.gt]: 0}},
    });

    console.log('TCL: mostWatched', mostWatched);
    console.log('TCL: mostWatched', mostWatched);
    const imageUrls = await mostWatched.map(async show => {
      const res = await mdb.searchTv({query: show.title});
      console.log('TCL: res', res);
      return models.PlexLibrary.update(
        {
          poster_path: res.results[0].poster_path,
        },
        {
          where: {UserId: user.id, title: show.title},
        },
      );
    });
  } catch (error) {
    return error.message;
  }
};

const createSections = (sections, user) => {
  console.log('Creating Sections');
  return Promise.map(sections, section => {
    return models.PlexSection.upsert(
      {
        title: section.title,
        type: section.type,
        key: section.key,
        UserId: user.id,
      },
      {
        where: {
          UserId: user.id,
          title: section.title,
        },
        returning: true,
        plain: true,
        raw: true,
      },
    );
  }).catch(err => {
    console.log(err);
  });
};

const importLibraries = async user => {
  const sections = await plexApi.getSections(user);
  return Promise.map(sections, section => {
    return importLibrary(section.key, user);
  });
};

const importMostWatched = async user => {
  // const sectionKeys = await models.PlexSection.findAll().then(sections => {
  //   return sections.map(section => section.key.toString());
  // });
  const sectionKeys = [1, 2];
  return Promise.map(sectionKeys, sectionKey => {
    return importMostWatchedData(sectionKey, user);
  }).catch(err => {
    console.log(err);
  });
};

const importMostWatchedData = async (sectionKey, user) => {
  const mostWatchedData = await plexApi.getMostWatched({sectionKey}, user);
  const mostWatchedDbData = await updateLibrary(mostWatchedData, user);
  return mostWatchedDbData;
};

const importLibrary = async (sectionKey, user) => {
  const libraryData = await plexApi.getLibraryDataBySection(
    {
      sectionKey,
    },
    user,
  );
  const dbLibraryData = await createLibrary(libraryData, user);
  return dbLibraryData;
};

const updateLibrary = (libraryData, user) => {
  return Promise.map(libraryData, data => {
    return models.PlexLibrary.upsert(
      {
        title: data.title,
        type: data.type,
        views: data.globalViewCount,
        rating_key: data.ratingKey,
        summary: data.summary,
        UserId: user.id,
        rating: data.rating,
        year: data.year,
        genre: JSON.stringify(data.Genre),
      },
      {
        where: {
          UserId: user.id,
          title: data.title,
        },
      },
    );
  }).catch(err => {
    console.log(err);
  });
};

const createLibrary = (libraryData, user) => {
  const userId = user.id;
  return Promise.map(libraryData, sectionLibraryData => {
    return models.PlexLibrary.upsert(
      {
        title: sectionLibraryData.title,
        UserId: userId,
        type: sectionLibraryData.type,
        views: sectionLibraryData.views,
        rating_key: sectionLibraryData.ratingKey,
        meta_data_path: sectionLibraryData.key,
        UserId: user.id,
        summary: sectionLibraryData.summary,
        rating: sectionLibraryData.rating,
        year: sectionLibraryData.year,
        genre: JSON.stringify(sectionLibraryData.Genre),
      },
      {
        where: {
          UserId: user.id,
          title: sectionLibraryData.title,
        },
      },
    );
  }).catch(err => console.log(err));
};

export default {
  importSections,
  importLibraries,
  importMostWatched,
  importTvPosters,
};

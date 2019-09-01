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

    const imageUrls = await mostWatched.map(async show => {
      const res = await mdb.searchTv({query: show.title});
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

const createSections = async (sections, user) => {
  try {
    return Promise.all(
      sections.map(async section => {
        const dbSection = await models.PlexSection.findOne({
          where: {
            UserId: user.id,
            title: section.title,
          },
        });
        if (dbSection) {
          await dbSection.update({
            title: section.title,
            type: section.type,
            key: section.key,
            UserId: user.id,
          });
        } else {
          await models.PlexSection.create({
            title: section.title,
            type: section.type,
            key: section.key,
            UserId: user.id,
          });
        }
      }),
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

const importLibraries = async user => {
  const sections = await plexApi.getSections(user);
  return Promise.map(sections, section => {
    return importLibrary(section.key, user);
  });
};

const importMostWatched = async user => {
  const sectionKeys = await models.PlexSection.findAll().then(sections => {
    return sections.map(section => section.key.toString());
  });
  return Promise.map(sectionKeys, sectionKey => {
    return importMostWatchedData(sectionKey, user);
  }).catch(err => {
    console.log(err);
  });
};

const importMostWatchedData = async (sectionKey, user) => {
  const mostWatchedData = await plexApi.getMostWatched({sectionKey}, user);
  const mostWatchedDbData = await updateOrCreateLibrary(mostWatchedData, user);
  return mostWatchedDbData;
};

const importLibrary = async (sectionKey, user) => {
  const libraryData = await plexApi.getLibraryDataBySection(
    {
      sectionKey,
    },
    user,
  );
  const dbLibraryData = await updateOrCreateLibrary(libraryData, user);
  return dbLibraryData;
};

const updateOrCreateLibrary = async (libraryData, user) => {
  try {
    return Promise.all(
      libraryData.map(async data => {
        const media = await models.PlexLibrary.findOne({
          where: {
            UserId: user.id,
            title: sectionLibraryData.title,
          },
        });
        if (media) {
          await media.update({
            title: data.title,
            type: data.type,
            views: data.globalViewCount,
            rating_key: data.ratingKey,
            summary: data.summary,
            UserId: user.id,
            rating: data.rating,
            year: data.year,
            genre: JSON.stringify(data.Genre),
          });
        } else {
          await models.PlexLibrary.create({
            title: data.title,
            type: data.type,
            views: data.globalViewCount,
            rating_key: data.ratingKey,
            summary: data.summary,
            UserId: user.id,
            rating: data.rating,
            year: data.year,
            genre: JSON.stringify(data.Genre),
          });
        }
      }),
    );
  } catch (error) {
    console.log(error);
    return error;
  }
};

export default {
  importSections,
  importLibraries,
  importMostWatched,
  importTvPosters,
};

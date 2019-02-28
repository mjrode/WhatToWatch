import Promise from 'bluebird';
import plexApi from './plexApi';
import models from '../../db/models';

const importSections = async () => {
  const sections = await plexApi.getSections();
  const dbSections = await createSections(sections);
  return dbSections;
};

const createSections = sections => {
  return Promise.map(sections, section => {
    return models.PlexSection.upsert(
      {
        title: section.title,
        type: section.type,
        key: section.key,
      },
      {
        where: {
          title: section.title,
        },
      },
    );
  }).catch(err => {
    console.log(err);
  });
};

const importLibraries = async () => {
  const sections = await plexApi.getSections();
  return Promise.map(sections, section => {
    return importLibrary(section.key);
  });
};

// Get section ids from database
//
const importMostWatched = async () => {
  const sectionKeys = await models.PlexSection.findAll().then(sections => {
    return sections.map(section => section.key.toString());
  });
  return Promise.map(sectionKeys, sectionKey => {
    return importMostWatchedData(sectionKey);
  }).catch(err => {
    console.log(err);
  });
};

const importMostWatchedData = async sectionKey => {
  const mostWatchedData = await plexApi.getMostWatched({sectionKey});
  const mostWatchedDbData = await updateLibrary(mostWatchedData);
  return mostWatchedDbData;
};

const importLibrary = async sectionKey => {
  const libraryData = await plexApi.getLibraryDataBySection({
    sectionKey,
  });
  const dbLibraryData = await createLibrary(libraryData);
  return dbLibraryData;
};

const updateLibrary = libraryData => {
  return Promise.map(libraryData, data => {
    return models.PlexLibrary.update(
      {
        title: data.title,
        type: data.type,
        views: data.globalViewCount,
        rating_key: data.ratingKey,
        metadata_path: data.key,
        summary: data.summary,
        rating: data.rating,
        year: data.year,
        genre: JSON.stringify(data.Genre),
      },
      {
        where: {
          title: data.title,
        },
      },
    );
  }).catch(err => {
    console.log(err);
  });
};

const createLibrary = libraryData => {
  return Promise.map(libraryData, sectionLibraryData => {
    return models.PlexLibrary.upsert(
      {
        title: sectionLibraryData.title,
        type: sectionLibraryData.type,
        views: sectionLibraryData.views,
        rating_key: sectionLibraryData.ratingKey,
        meta_data_path: sectionLibraryData.key,
        summary: sectionLibraryData.summary,
        rating: sectionLibraryData.rating,
        year: sectionLibraryData.year,
        genre: JSON.stringify(sectionLibraryData.Genre),
      },
      {
        where: {
          title: sectionLibraryData.title,
        },
      },
    );
  }).catch(err => console.log(err));
};

export default {importSections, importLibraries, importMostWatched};

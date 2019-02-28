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
  sections.forEach(async section => {
    await importLibrary(section.key);
  });
};

const importMostWatched = async req => {
  const mostWatched = await plexApi.getMostWatched(req);
  mostWatched.forEach(async libraryData => {
    await updateLibrary([libraryData]);
  });
};

const importLibrary = async sectionId => {
  const libraryData = await plexApi.getLibraryDataBySection({
    sectionId,
  });
  const dbLibraryData = await createLibrary(libraryData);
  console.log(dbLibraryData);
  return dbLibraryData;
};

const updateLibrary = libraryData => {
  return Promise.try(() => {
    libraryData.forEach(data => {
      models.PlexLibrary.update(
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
    });
  }).catch(err => {
    console.log(err);
  });
};

const createLibrary = libraryData => {
  return Promise.try(() => {
    libraryData.forEach(data => {
      models.PlexLibrary.upsert(
        {
          title: data.title,
          type: data.type,
          views: data.views,
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
    });
  }).catch(err => console.log(err));
};

export default {importSections, importLibraries, importMostWatched};

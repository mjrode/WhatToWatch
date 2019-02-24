import plexApi from './plexApi';
import models from '../../models';

const importSections = async () => {
  const sections = await plexApi.getSections();
  createSections(sections);
  return sections;
};

const createSections = sections => {
  sections.forEach(async section => {
    await models.PlexSection.create({
      userId: 1,
      title: section.title,
      type: section.type,
      key: section.key,
    });
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
  createLibrary(libraryData);
  return libraryData;
};

const updateLibrary = libraryData => {
  libraryData.forEach(async data => {
    await models.PlexLibrary.update(
      {
        userId: 1,
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
};

const createLibrary = libraryData => {
  libraryData.forEach(async data => {
    await models.PlexLibrary.upsert(
      {
        userId: 1,
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
};

export default {importSections, importLibraries, importMostWatched};

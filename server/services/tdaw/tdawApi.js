import config from '../../../config';
import helpers from '../helpers';
import models from '../../db/models';
import movieDbApi from '../moviedb/movieDbApi';

const tdawMediaUrl = function(mediaName, mediaType) {
  return {
    host: config.tdaw.tdawApiUrl,
    queryParams: {
      q: mediaName,
      k: config.tdaw.token,
      info: 1,
      mediaType,
    },
  };
};

const similarMedia = async function(req, mediaName, mediaType) {
  try {
    console.log('mediatype', mediaType);
    const urlParams = tdawMediaUrl(mediaName, mediaType);
    const mediaUrl = helpers.buildUrl(urlParams);
    const similarResponse = await helpers.request(mediaUrl);
    console.log('TCL: tdaw -> similarResponse', similarResponse);

    const jsonLibrary = await models.PlexLibrary.findAll({
      userId: req.user.id,
      type: 'show',
    });

    // Use Sonarr list instead
    const libraryTitles = jsonLibrary.map(show => show.title.toLowerCase());

    const filteredResponse = await similarResponse.filter(
      show => !libraryTitles.includes(show.Name.toLowerCase()),
    );

    console.log('filteredResponse ---', filteredResponse);
    const movieDbInfo = await getShowData(filteredResponse);
    console.log('movieDbInfo', movieDbInfo);
    return movieDbInfo;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const getShowData = async filteredResponse => {
  return await Promise.all(
    filteredResponse.map(show => movieDbApi.searchTv(show.Name)),
  );
};

const qlooMediaId = async (mediaName, mediaType) => {
  const params = {
    host:
      'https://qsz08t9vtl.execute-api.us-east-1.amazonaws.com/production/search',
    queryParams: {query: mediaName},
  };

  const formattedMediaType = mediaTypeMapping()[mediaType];

  const response = await helpers.request(helpers.buildUrl(params));

  const filteredResponse = response.results.filter(results =>
    results.categories.includes(formattedMediaType),
  );

  return filteredResponse[0].id;
};

const mediaTypeMapping = () => {
  return {tv: 'tv/shows', movie: 'film/movies'};
};

const qlooMedia = async (mediaId, mediaType) => {
  // recs?category=tv/shows&sample=70AB59C0-789F-4E11-B72D-FE09BF76901E&prioritize_indomain=False
  const formattedMediaType = mediaTypeMapping()[mediaType];
  const params = {
    host:
      'https://qsz08t9vtl.execute-api.us-east-1.amazonaws.com/production/recs',
    queryParams: {
      category: formattedMediaType,
      sample: mediaId,
      prioritize_indomain: 'False',
    },
  };

  const response = await helpers.request(helpers.buildUrl(params));
  console.log(response);
  return response;
};
export default {
  similarMedia,
  tdawMediaUrl,
  qlooMediaId,
  qlooMedia,
};

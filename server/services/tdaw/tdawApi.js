import config from '../../../config';
import helpers from '../helpers';
import models from '../../db/models';

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

const similarMedia = async function(mediaName, mediaType) {
  try {
    const urlParams = tdawMediaUrl(mediaName, mediaType);
    const mediaUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(mediaUrl);
    return response;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

const mostWatched = async () => {
  return models.PlexLibrary.findAll({
    order: [['views', 'DESC']],
    limit: 10,
  });
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
  mostWatched,
  qlooMediaId,
  qlooMedia,
};

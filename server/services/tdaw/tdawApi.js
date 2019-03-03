import config from '../../../config';
import helpers from '../helpers';

const mediaUrl = function(mediaName) {
  return {
    host: config.tdaw.tdawApiUrl,
    queryParams: {
      q: mediaName,
      k: config.tdaw.token,
      info: 1,
      type: 'show',
    },
  };
};

const similarMedia = async function() {
  try {
    const urlParams = mediaUrl();
    const getUsersUrl = helpers.buildUrl(urlParams);
    const response = await helpers.request(getUsersUrl);
    return response;
  } catch (error) {
    return {
      code: error.status,
      message: error.statusText,
      url: error.config.url,
    };
  }
};

export default {similarMedia, mediaUrl};

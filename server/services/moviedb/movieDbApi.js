import config from '../../../config';
import helpers from '../helpers';
import models from '../../db/models';
import MovieDb from 'moviedb-promise';
const mdb = new MovieDb(config.server.movieApiKey);

const searchTv = async showName => {
  try {
    const response = await mdb.searchTv({
      query: showName,
    });

    const show = response.results.filter(
      result => result.original_name.toLowerCase() === showName.toLowerCase(),
    )[0];

    return show;
  } catch (error) {
    helpers.handleError(error, 'searchTv');
  }
};

const similarTV = async showId => {
  try {
    console.log('showID', showId);
    const response = await mdb.tvSimilar({id: showId});
    console.log(response);
    return response;
  } catch (error) {
    helpers.handleError(error, 'searchTv');
  }
};

export default {searchTv, similarTV};

import config from '../../../config';
import helpers from '../helpers';
import models from '../../db/models';
import MovieDb from 'moviedb-promise';
const mdb = new MovieDb(config.server.movieApiKey);

const popularTv = async () => {
  try {
    const response = await mdb.miscPopularTvs();
    return response;
  } catch (error) {
    helpers.handleError(error, 'popularTv');
  }
};

const topRatedTv = async () => {
  try {
    const response = await mdb.miscTopRatedTvs();
    return response;
  } catch (error) {
    helpers.handleError(error, 'miscTopRatedTvs');
  }
};

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
    const response = await mdb.tvSimilar({id: showId});
    return response;
  } catch (error) {
    helpers.handleError(error, 'searchTv');
  }
};

export default {searchTv, similarTV, popularTv, topRatedTv};

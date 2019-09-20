import movieDbApi from './movieDbApi';
import models from '../../db/models';
import helpers from '../helpers';
import { Op } from 'sequelize';
import logger from '../../../config/winston';

const searchTv = async (req, res) => {
  const { showName } = req.query;
  const response = await movieDbApi.searchTv(showName);
  res.json(response);
};

const popularTv = async (req, res) => {
  const response = await movieDbApi.popularTv();
  // const jsonLibrary = await models.PlexLibrary.findAll({
  //   userId: req.user.id,
  //   type: 'show',
  // });
  // const libraryTitles = jsonLibrary.map(show => show.title.toLowerCase());
  // const filteredResponse = response.results.filter(
  //   show => !libraryTitles.includes(show.name.toLowerCase()),
  // );
  res.json(response.results);
};

const topRatedTv = async (req, res) => {
  const response = await movieDbApi.topRatedTv();
  // const jsonLibrary = await models.PlexLibrary.findAll({
  //   userId: req.user.id,
  //   type: 'show',
  // });
  // const libraryTitles = jsonLibrary.map(show => show.title.toLowerCase());
  // // const filteredResponse = response.results.filter(
  // show => !libraryTitles.includes(show.name.toLowerCase()),
  // );
  res.json(response.results);
};

const similarTv = async (req, res) => {
  const { showName } = req.query;
  const formattedShowName = showName.replace(/ *\([^)]*\) */g, '');
  logger.info(
    `Formatted show name for similar search: ${formattedShowName}`,
  );
  const searchResponse = await movieDbApi.searchTv(formattedShowName);
  logger.info(`TCL: similarTv -> similarResponse ${searchResponse}`);

  const similarResponse = await movieDbApi.similarTV(
    searchResponse.id,
  );
  logger.info(`TCL: similarTv -> similarResponse ${similarResponse}`);
  //  TODO: alert users when no shows are returned

  const jsonLibrary = await models.PlexLibrary.findAll({
    userId: req.user.id,
    type: 'show',
  });

  const libraryTitles = jsonLibrary.map(show =>
    show.title.toLowerCase(),
  );
  const filteredResponse = similarResponse.results.filter(
    show => !libraryTitles.includes(show.name.toLowerCase()),
  );
  res.json(filteredResponse);
};

export default {
  searchTv,
  similarTv,
  popularTv,
  topRatedTv,
};

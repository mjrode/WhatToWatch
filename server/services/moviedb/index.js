import movieDbApi from './movieDbApi';
import models from '../../db/models';
import sonarrService from '../sonarr/sonarrApi';
import helpers from '../helpers';
import {Op} from 'sequelize';

const searchTv = async (req, res) => {
  const {showName} = req.query;
  const response = await movieDbApi.searchTv(showName);
  res.json(response);
};

const popularTv = async (req, res) => {
  const response = await movieDbApi.popularTv();
  // const library = await sonarrService.getSeries(req.user);
  // const jsonLibrary = JSON.parse(library);
  const jsonLibrary = await models.PlexLibrary.findAll({
    userId: req.user.id,
    type: 'show',
  });
  const libraryTitles = jsonLibrary.map(show => show.title.toLowerCase());
  const filteredResponse = response.results.filter(
    show => !libraryTitles.includes(show.name.toLowerCase()),
  );
  res.json(filteredResponse);
};

const topRatedTv = async (req, res) => {
  const response = await movieDbApi.topRatedTv();
  // const library = await sonarrService.getSeries(req.user);
  // const jsonLibrary = JSON.parse(library);
  const jsonLibrary = await models.PlexLibrary.findAll({
    userId: req.user.id,
    type: 'show',
  });
  const libraryTitles = jsonLibrary.map(show => show.title.toLowerCase());
  const filteredResponse = response.results.filter(
    show => !libraryTitles.includes(show.name.toLowerCase()),
  );
  res.json(filteredResponse);
};

const similarTv = async (req, res) => {
  const {showName} = req.query;
  const searchResponse = await movieDbApi.searchTv(showName);
  const similarResponse = await movieDbApi.similarTV(searchResponse.id);
  console.log('TCL: similarTv -> similarResponse', similarResponse);
  // const library = await sonarrService.getSeries(req.user);
  // const jsonLibrary = JSON.parse(library);
  const jsonLibrary = await models.PlexLibrary.findAll({
    userId: req.user.id,
    type: 'show',
  });
  // Use Sonarr list instead
  const libraryTitles = jsonLibrary.map(show => show.title.toLowerCase());
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

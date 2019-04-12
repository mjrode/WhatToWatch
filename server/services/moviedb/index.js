import movieDbApi from './movieDbApi';
import models from '../../db/models';
import helpers from '../helpers';
import {Op} from 'sequelize';

const searchTv = async (req, res) => {
  const {showName} = req.query;
  const response = await movieDbApi.searchTv(showName);
  res.json(response);
};

const similarTv = async (req, res) => {
  const {showName} = req.query;
  const searchResponse = await movieDbApi.searchTv(showName);
  const similarResponse = await movieDbApi.similarTV(searchResponse.id);
  const library = await models.PlexLibrary.findAll({
    userId: req.user.id,
    type: 'show',
  });
  const libraryTitles = library.map(show => show.title.toLowerCase());
  const filteredResponse = similarResponse.results.filter(
    show => !libraryTitles.includes(show.name.toLowerCase()),
  );
  res.json(filteredResponse);
};

export default {
  searchTv,
  similarTv,
};

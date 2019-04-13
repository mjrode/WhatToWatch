import sonarrApi from './sonarrApi';
import models from '../../db/models';
import helpers from '../helpers';
import {Op} from 'sequelize';

const search = async (req, res) => {
  const {showName} = req.query;
  console.log(showName, req.user.sonarrUrl);
  const response = await sonarrApi.search(showName, req.user);
  res.json(response);
};

const addShow = async (req, res) => {
  const {showName} = req.query;
  const response = await sonarrApi.addShow(showName, req.user);
  res.json(response);
};

// const similarTv = async (req, res) => {
//   const {showName} = req.query;
//   const searchResponse = await movieDbApi.searchTv(showName);
//   const similarResponse = await movieDbApi.similarTV(searchResponse.id);
//   const library = await models.PlexLibrary.findAll({
//     userId: req.user.id,
//     type: 'show',
//   });
//   const libraryTitles = library.map(show => show.title.toLowerCase());
//   const filteredResponse = similarResponse.results.filter(
//     show => !libraryTitles.includes(show.name.toLowerCase()),
//   );
//   res.json(filteredResponse);
// };

export default {
  search,
  addShow,
};

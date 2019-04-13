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

export default {
  search,
  addShow,
};

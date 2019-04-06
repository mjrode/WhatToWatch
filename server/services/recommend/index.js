import models from '../../db/models';
import helpers from '../helpers';
import {Op} from 'sequelize';

const getMostWatched = async (req, res) => {
  try {
    console.log('mike');
    const mostWatched = await models.PlexLibrary.findAll({
      where: {user_id: req.user.id, views: {[Op.gt]: 0}},
    });
    console.log('mostwatched', mostWatched);
    res.json(mostWatched);
  } catch (error) {
    res.json(error.message);
  }
};

export default {
  getMostWatched,
};

import models from '../../db/models';
import helpers from '../helpers';
import { Op } from 'sequelize';

const getMostWatched = async (req, res) => {
  try {
    const mostWatched = await models.PlexLibrary.findAll({
      where: { UserId: req.user.id, type: 'show', views: { [Op.gt]: 0 } },
    });
    console.log('TCL: getMostWatched -> mostWatched', mostWatched);
    res.json(mostWatched);
  } catch (error) {
    res.json(error.message);
  }
};

export default {
  getMostWatched,
};

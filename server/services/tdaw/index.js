import tdawApi from './tdawApi';
import helpers from '../helpers';

const similarMedia = async (req, res) => {
  try {
    const response = await tdawApi.similarMedia();
    res.json(response);
  } catch (error) {
    helpers.handleError(res, tdawApi.name);
  }
};

export default {
  similarMedia,
};

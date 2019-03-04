import tdawApi from './tdawApi';
import helpers from '../helpers';

const similarMedia = async (req, res) => {
  try {
    const {mediaName} = req.query;
    const {mediaType} = req.query;
    const response = await tdawApi.similarMedia(mediaName, mediaType);
    res.json(response);
  } catch (error) {
    helpers.handleError(res, tdawApi.name);
  }
};

const mostWatched = async (req, res) => {
  console.log('was i called');
  const response = await tdawApi.mostWatched();
  console.log(response);
  res.json(response);
};

export default {
  similarMedia,
  mostWatched,
};

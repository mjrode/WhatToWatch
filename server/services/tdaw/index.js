import tdawApi from './tdawApi';
import helpers from '../helpers';

const similarMedia = async (req, res) => {
  try {
    console.log('I MADE IT');
    const {mediaName} = req.query;
    const {mediaType} = req.query;
    console.log(mediaName, mediaType);
    const response = await tdawApi.similarMedia(mediaName, mediaType);
    res.json(response);
  } catch (error) {
    helpers.handleError(res, tdawApi.name);
  }
};

export default {
  similarMedia,
};

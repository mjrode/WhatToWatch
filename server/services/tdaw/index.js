import tdawApi from './tdawApi';
import helpers from '../helpers';

const similarMedia = async (req, res) => {
  try {
    const {mediaName, mediaType} = req.query;
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

const qlooMedia = async (req, res) => {
  try {
    const {mediaName, mediaType} = req.query;
    const mediaId = await tdawApi.qlooMediaId(mediaName, mediaType);
    const response = await tdawApi.qlooMedia(mediaId, mediaType);
    res.json(response);
  } catch (error) {
    helpers.handleError(res, tdawApi.name);
  }
};

export default {
  similarMedia,
  mostWatched,
  qlooMedia,
};

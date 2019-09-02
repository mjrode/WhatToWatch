import tdawApi from './tdawApi';
import models from '../../db/models';
import helpers from '../helpers';

const similarMedia = async (req, res) => {
  try {
    const {showName} = req.query;
    console.log('Show name', showName);
    const media = 'show';
    const response = await tdawApi.similarMedia(
      req,
      showName.replace(/[{()}]/g, ''),
      media,
    );
    console.log('tdaw response test--', response);
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

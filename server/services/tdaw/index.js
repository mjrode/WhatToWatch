import tdawApi from './tdawApi';
import models from '../../db/models';
import helpers from '../helpers';
import logger from '../../../config/winston';

const similarMedia = async (req, res) => {
  try {
    const { showName } = req.query;
    logger.info(`Show name for similarMedia ${showName}`);
    const formattedShowName = showName.replace(/ *\([^)]*\) */g, '');
    logger.info(
      `show name for tdaw api similar media ${formattedShowName}`,
    );
    const media = 'show';
    const response = await tdawApi.similarMedia(
      req,
      formattedShowName.replace(/[{()}]/g, ''),
      media,
    );
    console.log('tdaw response test--', response);
    res.json(response);
  } catch (error) {
    helpers.handleError(res, tdawApi.name);
  }
};

const mostWatched = async (req, res) => {
  console.log('express-request-object---', req);
  const response = await tdawApi.mostWatched();
  console.log(response);
  res.json(response);
};

const qlooMedia = async (req, res) => {
  try {
    const { mediaName, mediaType } = req.query;
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

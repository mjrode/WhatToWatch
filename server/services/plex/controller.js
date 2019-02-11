// const slackWebAPI = require('../slack/web_api');
// const taskController = require('./task.controller');
// const userController = require('./user.controller');
// const messageHelper = require('../helpers/message');
// const util = require('../util/util');

module.exports = {
  handleActionResponse,
  populatePointMessage,
};


// import { secretKeys } from 'config';

// import cache from '../helpers/cache';
// import { validateConfig, errorHandler } from '../helpers/common_functions';
// import logger from '../helpers/logger';
// import getCheckImage from '../helpers/check_image';

// export const checkImage = (req, res) => { // eslint-disable-line
//   logger.info('checkImage', req.swagger.params);
//   const {
//     org_external_id: orgId,
//     account_number: acctNumber,
//     amount,
//     date,
//     check_number: checkNumber,
//   } = req.swagger.params.request.value;

//   const config = cache.getConfigFor(orgId, 'checkimage');
//   const secretKey = secretKeys[orgId];
//   const result = validateConfig(config, orgId, secretKey);
//   if (result) return errorHandler(res, result.code, result.message);

//   const { baseUrl, fiId } = config;
//   const frontRequest = getCheckImage(baseUrl, fiId, secretKey, acctNumber, amount, date, checkNumber, 'f');
//   const backRequest = getCheckImage(baseUrl, fiId, secretKey, acctNumber, amount, date, checkNumber, 'b');

//   Promise.all([frontRequest, backRequest]).then(([front, back]) => {
//     return res.json({ front, back });
//   });
// };

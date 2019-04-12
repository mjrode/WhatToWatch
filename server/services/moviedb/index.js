import movieDbApi from './movieDbApi';
import helpers from '../helpers';

const searchTv = async (req, res) => {
  const {showName} = req.query;
  const response = await movieDbApi.searchTv(showName);
  console.log(response);
  res.json(response);
};

const similarTv = async (req, res) => {
  const {showName} = req.query;
  const searchResponse = await movieDbApi.searchTv(showName);
  const response = await movieDbApi.similarTV(searchResponse.id);
  console.log(response);
  res.json(response);
};

export default {
  searchTv,
  similarTv,
};

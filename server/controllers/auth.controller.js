// eslint-disable-next-line import/prefer-default-export
const signup = (req, res) => {
  res.render('signup');
};

const signin = (req, res) => {
  res.render('signin');
};

export default {signup, signin};

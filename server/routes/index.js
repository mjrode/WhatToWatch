import apiRoute from './apis';

const init = server => {
  server.get('*', (req, res, next) => {
    console.log(`Request was made to: ${req.originalUrl}`);
    return next();
  });

  server.use('/api', apiRoute);

  server.use((err, req, res, next) => {
    if (err) {
      console.log('Error in routes/index', err);
    }
  });
};

export default {
  init,
};

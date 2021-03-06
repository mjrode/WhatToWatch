import express from 'express';
import { json, urlencoded } from 'body-parser';
// eslint-disable-next-line import/named
import passport from 'passport';
import cookieSession from 'cookie-session';
import cookieParser from 'cookie-parser';
import morganBody from 'morgan-body';
import models from './db/models';
import keys from '../config';
import plex from './routes/plex.route';
import tdaw from './routes/tdaw.route';
import movieDb from './routes/movieDb.route';
import sonarr from './routes/sonarr.route';
import auth from './routes/auth.route';
import admin from './routes/admin.route';
import recommend from './routes/recommend.route';
import winston from '../config/winston';

require('./services/auth/passport');

export default () => {
  const server = express();

  const create = config => {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.server.port);
    server.set('hostname', config.server.hostname);

    // Returns middleware that parses json
    server.use(json());
    server.use(urlencoded({ extended: true }));
    morganBody(server, {
      stream: winston.stream,
    });

    server.use(
      cookieSession({
        maxAge: 30 * 24 * 60 * 60 * 1000,
        keys: [keys.server.cookieKey],
      }),
    );
    server.use(cookieParser(keys.server.cookieKey));
    server.use(passport.initialize());
    server.use(passport.session());

    // Set up routes
    server.use('/api/plex', plex);
    server.use('/api/tdaw', tdaw);
    server.use('/api/moviedb', movieDb);
    server.use('/api/sonarr', sonarr);
    server.use('/api/recommend', recommend);
    server.use('/auth', auth);
    server.use('/api/auth', auth);
    server.use('/api/admin', admin);

    if (process.env.NODE_ENV === 'production') {
      server.use(express.static('client/build'));
      const path = require('path');
      server.get('*', (req, res) => {
        res.sendFile(
          path.resolve(
            __dirname,
            '..',
            'client',
            'build',
            'index.html',
          ),
        );
      });
    }

    server.get('*', function(req, res, next) {
      const err = new Error(
        `Page Not Found at route ${req.originalUrl}`,
      );
      err.statusCode = 404;
      next(err);
    });

    // eslint-disable-next-line no-unused-vars
    server.use(function(err, req, res, next) {
      // set locals, only providing error in development
      console.log('wasI called from here');
      res.locals.message = err.message;
      res.locals.error =
        req.app.get('env') === 'development' ? err : {};

      winston.error(
        `${err.status || 500} - ${err.message} - ${
          req.originalUrl
        } - ${req.method} - ${req.ip}`,
      );

      // eslint-disable-next-line no-param-reassign
      if (!err.statusCode) err.statusCode = 500; // If err has no specified error code, set error code to 'Internal Server Error (500)'
      res.status(err.statusCode).send(err.message); // All HTTP requests must have a response, so let's send back an error with its status code and message
    });
    return server;
  };

  const start = () => {
    const hostname = server.get('hostname');

    const port = server.get('port') || 8080;

    models.Sequelize.Op;
    server.listen(port, () => {
      console.log(
        `Express server listening on - http://${hostname}:${port}`,
      );
    });
  };

  process.on('SIGINT', function() {
    console.log('SIGINT');
    process.exit();
  });

  process.on('unhandledRejection', (reason, p) => {
    console.log(
      'Unhandled Rejection at: Promise',
      p,
      'reason:',
      reason,
    );
  });

  return { create, start };
};

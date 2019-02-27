/* eslint-disable global-require */
import express from 'express';
import {json, urlencoded} from 'body-parser';
import passport from 'passport';
import session from 'express-session';
import exphbs from 'express-handlebars';
import {sequelize} from './db/models';
import plex from './routes/plex.route';
import auth from './routes/auth';

export default () => {
  const server = express();

  const create = config => {
    // Server settings
    server.set('env', config.env);
    server.set('port', config.server.port);
    server.set('hostname', config.server.hostname);

    // Returns middleware that parses json
    server.use(json());
    server.use(urlencoded({extended: true}));

    // Passport
    server.use(
      session({secret: 'keyboard cat', resave: true, saveUninitialized: true}),
    );
    server.use(passport.initialize());
    server.use(passport.session()); // persistent login sessions

    // Set up routes
    server.use('/plex', plex);
    auth(server);

    // Set up views
    server.set('views', './client/views');
    server.engine(
      'hbs',
      exphbs({
        extname: '.hbs',
      }),
    );
    server.set('view engine', '.hbs');

    return server;
  };

  const start = () => {
    const hostname = server.get('hostname');

    const port = server.get('port');

    sequelize.sync().then(() => {
      server.listen(port, () => {
        console.log(`Express server listening on - http://${hostname}:${port}`);
      });
    });
  };

  process.on('unhandledRejection', (reason, p) => {
    console.log('Unhandled Rejection at: Promise', p, 'reason:', reason);
  });

  return {create, start};
};

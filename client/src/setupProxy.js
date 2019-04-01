const proxy = require('http-proxy-middleware');

module.exports = function(server) {
  server.use(
    proxy(['/plex/sections', '/auth/google'], {
      target: 'http://localhost:8080',
    }),
  );
};
